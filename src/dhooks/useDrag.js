/**
 * 拖拽属性的函数封装
 * @param {*} config 
 */
export const useDrag = (config) => {
    let {onDragStart, onDragEnd} = config;
    const getProps = (data) => {
        return {
            key: JSON.stringify(data),
            draggable: 'true',
            onDragStart: (e) => {
                onDragStart && onDragStart(data, e);
                e.dataTransfer.setData('custom', JSON.stringify(data));
            },
            onDragEnd: (e) => {
                onDragEnd && onDragEnd(data, e);
            },
        };
    };
  
    return getProps;
};
  
  