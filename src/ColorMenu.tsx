import React from 'react';

interface Props {
    colors: string[];
    onSelectColor: (color: string) => void;
}

const ColorMenu: React.FC<Props> = ({ colors, onSelectColor }) => {
    return (
        <div>
            {colors.map(color => (
                <button key={color} style={{ backgroundColor: color }} onClick={() => onSelectColor(color)}>
                    {color}
                </button>
            ))}
        </div>
    );
};

export default ColorMenu;
