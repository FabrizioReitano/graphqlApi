module.exports = {
    Query: {
        tags: async (_, { prefix, offset, count }, { dataSources }) =>
            await dataSources.tagAPI.findTags({ prefix, offset, count })
    }
};
