const imageUrl = require('@sanity/image-url')


module.exports = function (eleventyConfig, options = {}) {
    function urlFor(source) {
        return imageUrl(options.client).image(source)
    }
    eleventyConfig.addShortcode('imageUrlFor', (image, width = "400") => {
        return urlFor(image)
            .width(width)
            .auto('format')
    })
    eleventyConfig.addShortcode('croppedUrlFor', (image, width, height) => {
        return urlFor(image)
            .width(width)
            .height(height)
            .auto('format')
    })

    eleventyConfig.addShortcode('responsiveImage', (image, srcs="320,640,900", sizes="(min-width: 48em) 48em, 100vw", classList="") => {
        const sizeArray = srcs.split(',');
        const firstSize = sizeArray[0];
        const lastSize = sizeArray[sizeArray.length - 1];
        const srcSetContent = sizeArray.map((size) => {
            const url = urlFor(image)
                .width(size)
                .auto('format')
                .url()

            return `${url} ${size}w`
        }).join(',')

        return (
            `<img 
                src="${urlFor(image).width(firstSize)}"
                ${classList ? "class='" + classList + "'" : ""}
                srcset="${srcSetContent}"
                sizes="${sizes}"
                width="${lastSize}">`
        )
    })




}