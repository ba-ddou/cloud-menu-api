import { BusinessDocument } from '@cloudmenu/cloud-menu-shared-libs'
import BusinessModel from '../../models/Business'
import { ApolloError } from 'apollo-server'
import { getRandomAlphanumeric } from '../../helpers/alphanumerics'
export default class MongoDBService {
    async getBusiness(id: string): Promise<BusinessDocument | null> {
        let document = await BusinessModel.findById(id);
        if (document) return document;
    }
    async getBusinesses(ids: string[]): Promise<BusinessDocument[] | null> {
        let documents = await BusinessModel.find({ _id: { $in: ids } });
        if (documents && documents.length > 0) return documents;
        else return documents.map(document => document.toObject());
    }
    async getAllBusinesses(): Promise<BusinessDocument[] | null> {
        let documents = await BusinessModel.find();
        if (documents && documents.length > 0) return documents;
    }

    async createSection(businessId: string, name: string): Promise<{id:string,name:string} | null> {
        let document = await BusinessModel.findById(businessId);
        if (!document)
            throw new ApolloError(`Business with id ${businessId} does not exist`, '404');
        if (document.sections.map(section => section.name).includes(name))
            throw new ApolloError(`Section with name ${name} already exists`, '409');
        const id = `${getRandomAlphanumeric(16)()}`;
        const section = {
            id,
            name
        }
        document.sections.push(section);
        await document.save();
        return section;

    }

    async assertBusinessAndSection(businessId: string, sectionId: string): Promise<BusinessDocument | null> {
        let document = await BusinessModel.findById(businessId);
        if (!document)
            throw new ApolloError(`Business with id ${businessId} does not exist`, '404');
        if (!document.sections.map(section => section.id).includes(sectionId))
            throw new ApolloError(`Section with id ${sectionId} does not exist`, '404');
        return document;
    }
}