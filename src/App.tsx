import React, { useState } from 'react';
import BilliardsCanvas from './BilliardsCanvas';
import ColorMenu from './ColorMenu';

const App: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('red');

  const colors = ['red', 'blue', 'green', 'yellow', 'orange']; // Добавьте другие цвета по желанию

  return (
      <div>
        <BilliardsCanvas />
        <ColorMenu colors={colors} onSelectColor={setSelectedColor} />
      </div>
  );
};

export default App;

