export default (params, options) => {
    params.prefix = options.prefix || ''
    params.baseParams = options.baseParams || ''
    params.baseUrl = options.baseUrl || ''
    params.isVisTP = options.isVisTP || false
}