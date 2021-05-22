module.export = {
    webpackConfig: (config) => {
        config.resolve.alias
        .set('assets', api.resolve('src/assets'))
        .set('common', api.resolve('src/common'))
        .set('components', api.resolve('src/components'))
        .set('network', api.resolve('src/network'))
        .set('views', api.resolve('src/views'))
    }
}