import React, { useState } from 'react';
import { useDrop, useDrag } from '../yhooks';

const useDropDemo = () => {
    const [dragging, setDragging] = useState(null);

    const getDragProps = useDrag({
        onDragStart: (data) => {
            setDragging(data);
        },
        onDragEnd: (data) => {
            setDragging(null);
        },
    });

    const [props, { isHovering }] = useDrop({
        // 文字
        onText: (text, e) => {
            console.log(text);
        },
        // 文件
        onFiles: (files, e) => {
            console.log(files);
        },
        // 链接
        onUri: (uri, e) => {
            console.log(uri, e);
        },
        // dom 拖拽
        onDom: (content, e) => {
            console.log(content)
        },
    });

    return (
        <div>
            <div style={{ border: '1px dashed #e8e8e8', padding: 16, textAlign: 'center' }} {...props}>
                {isHovering ? 'release here' : 'drop here'}
            </div>

            <div style={{ display: 'flex', marginTop: 8 }}>
                {Array.from(Array(5)).map((e, i) => (
                <div
                    key = {i}
                    {...getDragProps(`box${i}`)}
                    style={{
                    border: '1px solid #e8e8e8',
                    padding: 16,
                    width: 80,
                    textAlign: 'center',
                    marginRight: 16,
                    }}
                >
                    box{i}
                </div>
                ))}
            </div>
            <div style={{ marginTop: 8 }}>{dragging ? <>dragging {dragging}</> : 'not dragging'}</div>
        </div>
    );
};

export default useDropDemo;