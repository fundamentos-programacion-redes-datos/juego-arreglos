import React, { useState, useEffect } from 'react';
import {
  Plus,
  Minus,
  Edit2,
  Search,
  Info,
  ArrowRight,
  Trash2,
  RotateCcw
} from 'lucide-react';

const App = () => {
  // Datos iniciales basados en la imagen proporcionada
  const initialData = [100, 34, 25, 46, 39, 101, 200, 43, 22];

  const [array, setArray] = useState(initialData);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Reiniciar el arreglo al estado de la imagen
  const resetArray = () => {
    setArray(initialData);
    setSelectedIndex(null);
    setIsEditing(null);
  };

  // Agregar elemento al final
  const addElement = () => {
    if (array.length < 12) {
      setArray([...array, Math.floor(Math.random() * 100)]);
    }
  };

  // Eliminar último elemento
  const removeElement = () => {
    if (array.length > 1) {
      setArray(array.slice(0, -1));
      if (selectedIndex >= array.length - 1) setSelectedIndex(null);
    }
  };

  // Editar un valor específico
  const handleUpdateValue = (index) => {
    const newVal = parseInt(editValue);
    if (!isNaN(newVal)) {
      const newArray = [...array];
      newArray[index] = newVal;
      setArray(newArray);
      setIsEditing(null);
      setEditValue('');
    }
  };

  // Buscar elementos
  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
      return;
    }
    const results = array
      .map((val, idx) => (val.toString().includes(searchTerm) ? idx : -1))
      .filter(idx => idx !== -1);
    setSearchResults(results);
  }, [searchTerm, array]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-4">

        {/* Encabezado */}

        <header className="text-center space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-300">
            Arreglos Unidimensionales
          </h2>

          <p className="text-slate-500 max-w-3xl mx-auto text-sm">
            Visualización interactiva de índices, posiciones y valores de un vector.
          </p>
        </header>

        {/* Visualización Principal (Estilo de la imagen) */}
        <section className="bg-white p-3 rounded-2xl shadow-xl border border-slate-200 overflow-x-auto">
          <div className="min-w-[600px] py-2">
            <div className="flex justify-center mb-2">
              <span className="text-sm font-semibold text-amber-600 flex items-center gap-2">
                Índices del arreglo o vector <ArrowRight size={14} className="rotate-90" />
              </span>
            </div>

            <div className="flex justify-center">
              {/* Contenedor del Arreglo */}
              <div className="inline-flex flex-col border-2 border-slate-300 rounded-lg overflow-hidden shadow-sm">

                {/* Fila de Índices (Amarillo) */}
                <div className="flex bg-amber-100 border-b border-slate-300">
                  {array.map((_, idx) => (
                    <div
                      key={`idx-${idx}`}
                      className={`w-14 h-10 flex items-center justify-center font-bold text-amber-700 border-r last:border-0 border-slate-300 ${selectedIndex === idx ? 'bg-amber-300' : ''}`}
                    >
                      {idx}
                    </div>
                  ))}
                </div>

                {/* Fila de Valores (Blanco) */}
                <div className="flex bg-white">
                  {array.map((val, idx) => (
                    <div
                      key={`val-${idx}`}
                      onClick={() => setSelectedIndex(idx)}
                      className={`w-14 h-14 flex items-center justify-center text-xl font-bold cursor-pointer transition-all border-r last:border-0 border-slate-300 hover:bg-indigo-50
                        ${selectedIndex === idx ? 'ring-inset ring-4 ring-indigo-500 bg-indigo-50' : ''}
                        ${searchResults.includes(idx) ? 'bg-green-100 text-green-700' : ''}`}
                    >
                      {val}
                    </div>
                  ))}
                </div>

                {/* Fila de Posiciones Humanas (Rosa) */}
                <div className="flex bg-rose-100 border-t border-slate-300">
                  {array.map((_, idx) => (
                    <div
                      key={`pos-${idx}`}
                      className="w-14 h-10 flex items-center justify-center font-bold text-rose-500 border-r last:border-0 border-slate-300 italic opacity-60"
                    >
                      {idx + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-between items-end px-4">
              <div className="text-slate-600">
                <p className="font-medium">Número de elementos (Tamaño): <span className="text-indigo-600 font-bold text-lg">{array.length}</span></p>
                <p className="text-xs text-slate-400 italic">* Los índices siempre comienzan en 0</p>
              </div>
              <button
                onClick={resetArray}
                className="flex items-center gap-2 px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded-lg text-sm font-medium transition-colors"
              >
                <RotateCcw size={14} /> Reiniciar ejemplo
              </button>
            </div>
          </div>
        </section>

        {/* Panel de Control e Interacción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Herramientas de Edición */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-700">
              <Edit2 size={20} className="text-indigo-500" /> Manipular Datos
            </h2>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={addElement}
                disabled={array.length >= 12}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-md active:scale-95"
              >
                <Plus size={18} /> Agregar
              </button>
              <button
                onClick={removeElement}
                disabled={array.length <= 1}
                className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-300 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-md active:scale-95"
              >
                <Minus size={18} /> Quitar
              </button>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-500">Modificar valor seleccionado:</p>
              {selectedIndex !== null ? (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={isEditing === selectedIndex ? editValue : ''}
                    placeholder={`Valor actual: ${array[selectedIndex]}`}
                    onChange={(e) => {
                      setIsEditing(selectedIndex);
                      setEditValue(e.target.value);
                    }}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => handleUpdateValue(selectedIndex)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                <p className="text-sm italic text-slate-400">Selecciona una celda en el arreglo para editar su valor.</p>
              )}
            </div>
          </div>

          {/* Buscador e Información Dinámica */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-700">
              <Search size={20} className="text-indigo-500" /> Explorar Contenido
            </h2>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Buscar valor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 min-h-[100px]">
              {selectedIndex !== null ? (
                <div className="space-y-1 animate-in fade-in slide-in-from-left-2 duration-300">
                  <p className="text-indigo-600 font-bold">Elemento seleccionado:</p>
                  <p className="text-slate-700">
                    "El <span className="font-bold">arreglo</span> en la posición <span className="text-amber-600 font-bold">{selectedIndex}</span> tiene un elemento cuyo valor es: <span className="font-bold text-indigo-700">{array[selectedIndex]}</span>"
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    En programación accederías así: <code className="bg-slate-200 px-1 rounded text-pink-600">miArreglo[{selectedIndex}]</code>
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 h-full pt-4">
                  <Info size={24} className="mb-2 opacity-50" />
                  <p className="text-sm">Toca un elemento para ver su especificación técnica.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conceptos Clave */}
        <footer className="bg-indigo-900 text-indigo-100 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Info size={20} /> Recordatorios importantes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-indigo-800/50 p-3 rounded-lg border border-indigo-700">
              <span className="font-bold text-amber-400 block mb-1">Índice (Index)</span>
              Es la dirección numérica de la celda. Siempre empieza en <span className="font-mono bg-indigo-950 px-1 rounded">0</span>.
            </div>
            <div className="bg-indigo-800/50 p-3 rounded-lg border border-indigo-700">
              <span className="font-bold text-rose-400 block mb-1">Elemento/Valor</span>
              Es el dato real guardado dentro de la celda (números, letras, etc.).
            </div>
            <div className="bg-indigo-800/50 p-3 rounded-lg border border-indigo-700">
              <span className="font-bold text-emerald-400 block mb-1">Longitud (Length)</span>
              Es el total de elementos. El último índice siempre es <span className="font-mono bg-indigo-950 px-1 rounded">Longitud - 1</span>.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;
