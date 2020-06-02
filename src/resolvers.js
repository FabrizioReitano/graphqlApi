module.exports = {
    Query: {
        tags: async (_, { prefix, offset, count }, { dataSources }) =>
            await dataSources.tagAPI.findTags({ prefix, offset, count }),
        services: async(_, { category, center, radius, offset, count }, { dataSources }) =>
            await dataSources.serviceAPI.findServices({ category, center, radius, offset, count }),
        service: async(_, { slug }, { dataSources}) => await dataSources.serviceAPI.findBySlug({ slug })
    }
}
