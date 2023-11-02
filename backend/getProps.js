const { JSDOM } = require('jsdom');

const getProps = (html) => {
    console.log(html)
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const elements = document.querySelectorAll('[data-component]');
    const customProps = {};

    elements.forEach((element, i) => {
        const componentType = element.getAttribute('data-component') || "type-error";
        customProps[componentType + "" + i] = {};

        const repeaterElements = element.querySelectorAll('[data-repeater]');

        if (repeaterElements.length > 0) {
            const repeaterKey = repeaterElements[0].getAttribute('data-repeater');
            const repeaterArray = [];

            repeaterElements.forEach((repeaterElement, j) => {
                const repeaterProps = {};
                const repeaterNodes = repeaterElement.querySelectorAll('[data-propsname]');
                repeaterNodes.forEach((node) => {
                    const propsName = node.getAttribute('data-propsname') || "propsname-error";
                    try {
                        const fields = JSON.parse(propsName);
                        Object.entries(fields).forEach(field => {
                            const propsName = field[0];
                            const propSource = field[1];
                            repeaterProps[propsName] = node[propSource];
                        });
                    } catch (e) {
                        console.log(e);
                    }
                });

                repeaterArray.push(repeaterProps);
            });

            customProps[componentType + "" + i][repeaterKey] = repeaterArray;
        } else {
            const componentProps = customProps[componentType + "" + i];
            const editableNodes = element.querySelectorAll('[data-propsname]');
            editableNodes.forEach((node) => {
                const propsName = node.getAttribute('data-propsname') || "propsname-error";
                try {
                    const fields = JSON.parse(propsName);
                    Object.entries(fields).forEach(field => {
                        const propsName = field[0];
                        const propSource = field[1];
                        componentProps[propsName] = node[propSource];
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        }
    });

    return JSON.stringify(customProps);
}

module.exports = getProps;






// default
// const { JSDOM } = require('jsdom');
//
//
// const getProps =    (html)=>{
//     const dom = new JSDOM(html);
//     const document = dom.window.document;
//     const elements = document.querySelectorAll('[data-component]');
//     const customProps={}
//
//     elements.forEach((element , i ) => {
//         const componentType = element.getAttribute('data-component')||"type-error";
//         customProps[componentType+""+i]={}
//         const  editableNodes=  element.querySelectorAll('[data-propsname]');
//         editableNodes.forEach((node  )=>{
//             const propsName = node.getAttribute('data-propsname')||"propsname-error"
//             try{
//                 const fields = JSON.parse(propsName)
//                 Object.entries(fields).forEach(field=>{
//                     const propsName=field[0]
//                     const propSource = field[1]
//                     customProps[componentType+""+i][propsName]=node[propSource]
//                 })
//             } catch(e){
//                 console.log(e)
//             }
//             // Object.entries()
//             // if(componentType&&propsName&&source){
//             //     customProps[componentType+""+i][propsName] = node[source]
//             // }
//         })
//     });
//
//     return JSON.stringify(customProps)
// }
//
// module.exports = getProps;
