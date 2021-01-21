import { useMemo, useState, useRef, useCallback } from 'react';

const getProps = (
    callback,
    setIsHovering
) => ({
    onDragOver: (event) => {
        event.preventDefault();
    },
    onDragEnter: (event) => {
        event.preventDefault();
        setIsHovering(true);
    },
    onDragLeave: () => {
        setIsHovering(false);
    },
    onDrop: (event) => {
        event.preventDefault();
        event.persist();
        setIsHovering(false);
        callback(event.dataTransfer, event);
    },
    onPaste: (event) => {
        event.persist();
        callback(event.clipboardData, event);
    },
});

/**
 * 拖拽 文字 | 文件 | uri资源标识符 | dom 
 * @param {*} options 
 */
export const useDrop = (options = {}) => {

    const optionsRef = useRef(options);
    optionsRef.current = options;

    const [isHovering, setIsHovering] = useState(false);

    const callback = useCallback((dataTransfer, event) => {
        const uri = dataTransfer.getData('text/uri-list');
        const dom = dataTransfer.getData('custom');

        if (dom && optionsRef.current.onDom) {
            let data = dom;
            try {
                data = JSON.parse(dom);
            } catch (e) {
                data = dom;
            }
            optionsRef.current.onDom(data, event);
            return;
        }

        if (uri && optionsRef.current.onUri) {
            optionsRef.current.onUri(uri, event);
            return;
        }

        if (dataTransfer.files && dataTransfer.files.length && optionsRef.current.onFiles) {
            optionsRef.current.onFiles(Array.from(dataTransfer.files), event);
            return;
        }

        if (dataTransfer.items && dataTransfer.items.length && optionsRef.current.onText) {
            dataTransfer.items[0].getAsString((text) => {
                optionsRef.current.onText(text, event);
            });
        }
    }, []);

    const props = useMemo(() => getProps(callback, setIsHovering), [
        callback,
        setIsHovering,
    ]);

    return [props, { isHovering }];
};
