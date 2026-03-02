import { useState } from "react";

const exercises = [
  // ─── REACT ANTIPATTERNS ───────────────────────────────────────
  {
    id: 1,
    category: "React",
    level: "Básico",
    title: "¿Cuál es el antipatrón?",
    description:
      "El siguiente componente tiene un antipatrón muy común en React. Identifícalo y propón la refactorización.",
    bad: `// UserList.jsx
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(data => setUsers(data));
  });

  return (
    <ul>
      {users.map(u => (
        <li>{u.name}</li>
      ))}
    </ul>
  );
}`,
    antipattern: "useEffect sin array de dependencias + key faltante en lista",
    explanation:
      "Sin el array `[]` como segundo argumento de useEffect, el efecto se ejecuta en CADA render, causando un loop infinito. Además, cada elemento de la lista necesita una `key` única para que React reconcilie eficientemente el DOM.",
    good: `// UserList.jsx ✅
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(data => setUsers(data));
  }, []); // ✅ Array vacío: solo corre al montar

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name}</li> // ✅ key única
      ))}
    </ul>
  );
}`,
  },
  {
    id: 2,
    category: "React",
    level: "Intermedio",
    title: "¿Cuál es el antipatrón?",
    description:
      "Este formulario de búsqueda actualiza el estado en cada keystroke y realiza operaciones costosas. ¿Qué está mal?",
    bad: `// SearchBar.jsx
function SearchBar({ products }) {
  const [query, setQuery] = useState('');

  const results = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    // Analítica en cada keystroke
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({ search: e.target.value })
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {results.map(p => <ProductCard key={p.id} product={p} />)}
    </>
  );
}`,
    antipattern: "Side effects en handlers de UI + cálculo sin memoización",
    explanation:
      "1) Hacer fetch dentro de onChange dispara una petición HTTP en cada tecla pulsada (puede ser cientos de requests). Solución: debounce o useEffect con debounce. 2) El filtrado de `products` se recalcula en cada render aunque `query` no haya cambiado. Solución: `useMemo`.",
    good: `// SearchBar.jsx ✅
import { useState, useMemo, useEffect } from 'react';
import { useDebounce } from './hooks/useDebounce';

function SearchBar({ products }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400); // ✅ espera 400ms

  // ✅ Solo recalcula cuando products o debouncedQuery cambian
  const results = useMemo(
    () => products.filter(p =>
      p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    ),
    [products, debouncedQuery]
  );

  // ✅ Analítica solo cuando el usuario para de escribir
  useEffect(() => {
    if (debouncedQuery) {
      fetch('/api/analytics', {
        method: 'POST',
        body: JSON.stringify({ search: debouncedQuery })
      });
    }
  }, [debouncedQuery]);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {results.map(p => <ProductCard key={p.id} product={p} />)}
    </>
  );
}`,
  },
  {
    id: 3,
    category: "React",
    level: "Intermedio",
    title: "¿Cuál es el antipatrón?",
    description:
      "Esta arquitectura de componentes funciona, pero tiene un problema estructural grave conforme la app crece.",
    bad: `// App.jsx — Prop Drilling
function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <Layout user={user} theme={theme}>
      <Sidebar user={user} theme={theme} />
      <Main user={user} theme={theme} setUser={setUser}>
        <Dashboard user={user} theme={theme} />
        <Profile user={user} setUser={setUser} theme={theme} />
      </Main>
    </Layout>
  );
}

// Sidebar no usa user, solo lo pasa hacia abajo
function Sidebar({ user, theme }) {
  return <Nav user={user} theme={theme} />;
}`,
    antipattern: "Prop Drilling",
    explanation:
      "Se pasan props a través de múltiples niveles de componentes que no las necesitan (como `Sidebar` pasando `user` sin usarlo). Esto crea acoplamiento innecesario, dificulta el mantenimiento y obliga a modificar muchos archivos ante un cambio. Solución: React Context o un gestor de estado (Zustand, Redux).",
    good: `// context/AppContext.jsx ✅
const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

// App.jsx ✅ — Limpio, sin prop drilling
function App() {
  return (
    <AppProvider>
      <Layout>
        <Sidebar />
        <Main>
          <Dashboard />
          <Profile />
        </Main>
      </Layout>
    </AppProvider>
  );
}

// Cualquier componente consume lo que necesita directamente
function Profile() {
  const { user, setUser } = useApp(); // ✅ Solo toma lo que usa
  // ...
}`,
  },
  {
    id: 4,
    category: "React",
    level: "Avanzado",
    title: "¿Cuál es el antipatrón?",
    description:
      "Este custom hook gestiona una lista de tareas. Hay un bug sutil relacionado con closures y estado.",
    bad: `// useTodos.js
function useTodos() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  // Llamada en un intervalo para auto-guardar
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Guardando:', todos.length, 'tareas');
      fetch('/api/todos', {
        method: 'PUT',
        body: JSON.stringify(todos)
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []); // <- ¿Ves el problema?

  return { todos, addTodo, toggleTodo };
}`,
    antipattern: "Stale Closure en useEffect",
    explanation:
      "El `useEffect` captura `todos` al momento del montaje (array vacío `[]`). Aunque `todos` cambie, el intervalo siempre ve la versión inicial (closure obsoleta o 'stale'). Esto provoca que el auto-guardado siempre envíe la lista vacía. Solución: usar la forma funcional del setter o `useRef` para mantener la referencia actualizada.",
    good: `// useTodos.js ✅
function useTodos() {
  const [todos, setTodos] = useState([]);
  const todosRef = useRef(todos);

  // ✅ Sincroniza la ref con el estado actual
  useEffect(() => {
    todosRef.current = todos;
  }, [todos]);

  const addTodo = (text) => {
    // ✅ Forma funcional: siempre parte del estado más reciente
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // ✅ Lee siempre el valor más reciente via ref
      const current = todosRef.current;
      console.log('Guardando:', current.length, 'tareas');
      fetch('/api/todos', { method: 'PUT', body: JSON.stringify(current) });
    }, 5000);
    return () => clearInterval(interval);
  }, []); // ✅ El intervalo no necesita recrearse

  return { todos, addTodo, toggleTodo };
}`,
  },
  // ─── NODE.JS ANTIPATTERNS ─────────────────────────────────────
  {
    id: 5,
    category: "Node.js",
    level: "Básico",
    title: "¿Cuál es el antipatrón?",
    description:
      "Esta ruta de Express obtiene productos de base de datos. Identifica el problema de rendimiento.",
    bad: `// routes/products.js
router.get('/products', async (req, res) => {
  try {
    const products = await db.query('SELECT * FROM products');

    // Enriquecer cada producto con su categoría
    const enriched = [];
    for (const product of products) {
      const category = await db.query(
        'SELECT * FROM categories WHERE id = ?',
        [product.category_id]
      );
      enriched.push({ ...product, category: category[0] });
    }

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});`,
    antipattern: "N+1 Query Problem",
    explanation:
      "Por cada producto se ejecuta una query adicional a la BD. Si hay 100 productos, se lanzan 101 queries (1 inicial + 100 para categorías). Esto se llama el problema N+1 y destruye el rendimiento. Solución: usar un JOIN en la query inicial, o cargar todas las categorías en una sola query.",
    good: `// routes/products.js ✅
router.get('/products', async (req, res) => {
  try {
    // ✅ Un solo JOIN trae todo en una query
    const products = await db.query(\`
      SELECT p.*, c.name AS category_name, c.slug AS category_slug
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
    \`);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Alternativa cuando el JOIN no es viable:
// ✅ Carga todas las categorías relevantes en UNA sola query
router.get('/products-v2', async (req, res) => {
  const products = await db.query('SELECT * FROM products');
  const ids = [...new Set(products.map(p => p.category_id))];
  const categories = await db.query(
    'SELECT * FROM categories WHERE id IN (?)', [ids]
  );
  const catMap = Object.fromEntries(categories.map(c => [c.id, c]));
  res.json(products.map(p => ({ ...p, category: catMap[p.category_id] })));
});`,
  },
  {
    id: 6,
    category: "Node.js",
    level: "Intermedio",
    title: "¿Cuál es el antipatrón?",
    description:
      "Este módulo de configuración es ampliamente utilizado en la app. ¿Qué problema de arquitectura tiene?",
    bad: `// config.js — usado en toda la app
const config = {
  db: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin123',       // <- PROBLEMA
    database: 'myapp_prod'
  },
  jwt: {
    secret: 'super_secret_key', // <- PROBLEMA
    expiresIn: '7d'
  },
  aws: {
    accessKey: 'AKIAIOSFODNN7EXAMPLE', // <- PROBLEMA
    secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
  },
  env: 'production'
};

module.exports = config;`,
    antipattern: "Hardcoded Secrets / Magic Values",
    explanation:
      "Las credenciales, tokens y claves secretas nunca deben estar en el código fuente. Si este archivo se sube a Git (incluso en un commit privado), las credenciales quedan expuestas y en el historial permanentemente. Solución: variables de entorno con `.env` (y `.env` en `.gitignore`) + validación al inicio.",
    good: `// config.js ✅
import 'dotenv/config';

function requireEnv(key) {
  const val = process.env[key];
  if (!val) throw new Error(\`Variable de entorno requerida: \${key}\`);
  return val;
}

const config = {
  db: {
    host:     requireEnv('DB_HOST'),
    port:     parseInt(requireEnv('DB_PORT'), 10),
    user:     requireEnv('DB_USER'),
    password: requireEnv('DB_PASSWORD'),
    database: requireEnv('DB_NAME'),
  },
  jwt: {
    secret:    requireEnv('JWT_SECRET'),
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  },
  aws: {
    accessKey: requireEnv('AWS_ACCESS_KEY'),
    secretKey: requireEnv('AWS_SECRET_KEY'),
  },
  env: process.env.NODE_ENV ?? 'development',
};

export default config;

// .env (agregar al .gitignore ✅)
// DB_HOST=localhost
// DB_PASSWORD=mi_password_seguro
// JWT_SECRET=una_clave_muy_larga_y_aleatoria`,
  },
  {
    id: 7,
    category: "Node.js",
    level: "Intermedio",
    title: "¿Cuál es el antipatrón?",
    description:
      "Esta función de autenticación tiene un problema de seguridad y uno de manejo de errores. Identifica ambos.",
    bad: `// auth.service.js
async function login(email, password) {
  const user = await db.query(
    \`SELECT * FROM users WHERE email = '\${email}'\`
  );

  if (!user[0]) {
    throw new Error('Usuario no encontrado');
  }

  if (user[0].password !== password) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign({ id: user[0].id }, config.jwt.secret);
  return { token, user: user[0] };
}`,
    antipattern:
      "SQL Injection + Contraseñas en texto plano + User enumeration",
    explanation:
      "3 vulnerabilidades: 1) La interpolación directa en SQL permite inyección (ej: email = `' OR 1=1 --`). 2) Comparar contraseñas en texto plano expone a todos los usuarios si la BD es comprometida. 3) Los mensajes de error distintos para 'usuario no encontrado' vs 'contraseña incorrecta' permiten enumerar usuarios válidos (user enumeration attack).",
    good: `// auth.service.js ✅
import bcrypt from 'bcrypt';

async function login(email, password) {
  // ✅ Query parametrizada: imposible inyectar SQL
  const users = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  const user = users[0];
  const INVALID_MSG = 'Credenciales inválidas'; // ✅ Mismo mensaje en ambos casos

  if (!user) {
    throw new Error(INVALID_MSG); // ✅ No revela si el usuario existe
  }

  // ✅ Comparación con hash bcrypt (nunca texto plano)
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new Error(INVALID_MSG);
  }

  // ✅ JWT con expiración explícita, sin exponer la contraseña
  const { password_hash, ...safeUser } = user;
  const token = jwt.sign(
    { id: user.id, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );

  return { token, user: safeUser };
}`,
  },
  {
    id: 8,
    category: "Node.js",
    level: "Avanzado",
    title: "¿Cuál es el antipatrón?",
    description:
      "Esta implementación de confirmación de orden tiene un problema arquitectural serio bajo carga.",
    bad: `// orderController.js
router.post('/order/confirm', async (req, res) => {
  const { orderId, userId } = req.body;

  // Guardar orden
  const order = await OrderService.create({ orderId, userId });

  // Enviar emails (puede tardar 2-3 segundos c/u)
  await EmailService.sendOrderConfirmation(order);
  await EmailService.sendAdminNotification(order);
  await EmailService.sendWarehouseAlert(order);

  // El cliente espera hasta que todos los emails terminen
  res.json({ success: true, order });
});`,
    antipattern: "Operaciones síncronas de larga duración en el request cycle",
    explanation:
      "El cliente HTTP espera 2-3+ segundos a que se envíen 3 emails antes de recibir respuesta. Esto bloquea el event loop, aumenta el tiempo de respuesta percibido, puede causar timeouts y no escala. Los emails son side effects que NO necesitan completarse para confirmar la orden. Solución: colas de mensajes (Bull, RabbitMQ, SQS) o al menos responder antes de procesar.",
    good: `// orderController.js ✅ — Con cola de trabajos (Bull)
import Queue from 'bull';
const emailQueue = new Queue('emails', { redis: config.redis });

// Worker en background (puede ser otro proceso/servidor)
emailQueue.process(async (job) => {
  const { type, data } = job.data;
  switch (type) {
    case 'ORDER_CONFIRM':  await EmailService.sendOrderConfirmation(data); break;
    case 'ADMIN_NOTIFY':   await EmailService.sendAdminNotification(data);  break;
    case 'WAREHOUSE_ALERT': await EmailService.sendWarehouseAlert(data);    break;
  }
});

router.post('/order/confirm', async (req, res) => {
  const { orderId, userId } = req.body;
  const order = await OrderService.create({ orderId, userId });

  // ✅ Encolar tareas: retorna en milisegundos
  await emailQueue.addBulk([
    { data: { type: 'ORDER_CONFIRM',   data: order } },
    { data: { type: 'ADMIN_NOTIFY',    data: order } },
    { data: { type: 'WAREHOUSE_ALERT', data: order } },
  ]);

  // ✅ Responde al cliente sin esperar los emails (~50ms vs ~3000ms)
  res.json({ success: true, order });
});`,
  },
];

const categoryColors = {
  React: { bg: "#0ea5e9", light: "#e0f2fe", text: "#0c4a6e" },
  "Node.js": { bg: "#22c55e", light: "#dcfce7", text: "#14532d" },
};
const levelColors = {
  Básico: { bg: "#fef9c320", text: "#fde047", border: "#fde04740" },
  Intermedio: { bg: "#fed7aa20", text: "#fb923c", border: "#fb923c40" },
  Avanzado: { bg: "#fce7f320", text: "#f472b6", border: "#f472b640" },
};

export default function AntipatronesApp() {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState({});
  const [activeTab, setActiveTab] = useState("bad");
  const [filter, setFilter] = useState("Todos");

  const exercise = exercises.find((e) => e.id === selected);
  const isRevealed = revealed[selected];

  const filtered =
    filter === "Todos"
      ? exercises
      : exercises.filter((e) => e.category === filter);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f11",
        color: "#e2e8f0",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        display: "flex",
        flexDirection: "column",
      }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #1e1e2e",
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "#0a0a0d",
        }}>
        <div
          style={{
            width: 34,
            height: 34,
            background: "linear-gradient(135deg,#f43f5e,#a855f7)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
          }}>
          🐛
        </div>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "-0.3px",
            }}>
            Antipatrones Workshop
          </h1>
          <p style={{ margin: 0, fontSize: 11, color: "#475569" }}>
            Identificación &amp; Refactorización · React &amp; Node.js
          </p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {["Todos", "React", "Node.js"].map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setSelected(null);
              }}
              style={{
                padding: "4px 12px",
                borderRadius: 20,
                border: "1px solid",
                borderColor: filter === f ? "#a855f7" : "#2a2a3a",
                background: filter === f ? "#a855f720" : "transparent",
                color: filter === f ? "#d8b4fe" : "#64748b",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: filter === f ? 700 : 400,
              }}>
              {f}
            </button>
          ))}
        </div>
      </header>

      <div
        style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 270,
            borderRight: "1px solid #1e1e2e",
            overflowY: "auto",
            background: "#0a0a0d",
            flexShrink: 0,
          }}>
          <div
            style={{
              padding: "10px 16px 6px",
              fontSize: 10,
              color: "#334155",
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>
            {filtered.length} ejercicios
          </div>
          {filtered.map((ex) => {
            const cat = categoryColors[ex.category];
            const lvl = levelColors[ex.level];
            const done = !!revealed[ex.id];
            return (
              <button
                key={ex.id}
                onClick={() => {
                  setSelected(ex.id);
                  setActiveTab("bad");
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  borderBottom: "1px solid #1a1a24",
                  background: selected === ex.id ? "#16162a" : "transparent",
                  border: "none",
                  borderLeft:
                    selected === ex.id
                      ? "3px solid #a855f7"
                      : "3px solid transparent",
                  cursor: "pointer",
                  color: "#e2e8f0",
                  fontFamily: "inherit",
                  transition: "background 0.15s",
                }}>
                <div
                  style={{
                    display: "flex",
                    gap: 5,
                    marginBottom: 5,
                    alignItems: "center",
                  }}>
                  <span
                    style={{
                      fontSize: 9,
                      padding: "2px 7px",
                      borderRadius: 10,
                      background: cat.bg,
                      color: "#fff",
                      fontWeight: 700,
                      letterSpacing: 0.3,
                    }}>
                    {ex.category}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      padding: "2px 7px",
                      borderRadius: 10,
                      background: lvl.bg,
                      color: lvl.text,
                      border: `1px solid ${lvl.border}`,
                    }}>
                    {ex.level}
                  </span>
                  {done && (
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: 12,
                        color: "#22c55e",
                      }}>
                      ✓
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: selected === ex.id ? "#cbd5e1" : "#64748b",
                  }}>
                  Ejercicio #{ex.id}
                </div>
              </button>
            );
          })}
        </aside>

        {/* Main Panel */}
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          {!exercise ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                color: "#2d3748",
              }}>
              <div style={{ fontSize: 56 }}>🔍</div>
              <p style={{ fontSize: 14, color: "#475569" }}>
                Selecciona un ejercicio del panel izquierdo
              </p>
              <p style={{ fontSize: 12, color: "#334155" }}>
                {exercises.length} ejercicios disponibles · 4 React · 4 Node.js
              </p>
            </div>
          ) : (
            <div style={{ maxWidth: 800 }}>
              {/* Exercise Header */}
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 10,
                    flexWrap: "wrap",
                  }}>
                  <span
                    style={{
                      fontSize: 11,
                      padding: "3px 10px",
                      borderRadius: 12,
                      background: categoryColors[exercise.category].bg,
                      color: "#fff",
                      fontWeight: 700,
                    }}>
                    {exercise.category}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      padding: "3px 10px",
                      borderRadius: 12,
                      background: levelColors[exercise.level].bg,
                      color: levelColors[exercise.level].text,
                      border: `1px solid ${levelColors[exercise.level].border}`,
                    }}>
                    {exercise.level}
                  </span>
                </div>
                <h2
                  style={{
                    margin: "0 0 8px",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#f1f5f9",
                  }}>
                  {exercise.title}
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: "#94a3b8",
                    fontSize: 13,
                    lineHeight: 1.7,
                  }}>
                  {exercise.description}
                </p>
              </div>

              {/* Tabs */}
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  borderBottom: "1px solid #1e1e2e",
                  marginBottom: 0,
                }}>
                {["bad", ...(isRevealed ? ["good"] : [])].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: "9px 18px",
                      border: "none",
                      borderBottom:
                        activeTab === tab
                          ? "2px solid #a855f7"
                          : "2px solid transparent",
                      background: "transparent",
                      color: activeTab === tab ? "#d8b4fe" : "#475569",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                    }}>
                    {tab === "bad"
                      ? "🔴 Código problemático"
                      : "✅ Refactorización"}
                  </button>
                ))}
              </div>

              {/* Code Block */}
              <pre
                style={{
                  background: "#060608",
                  border: "1px solid #1e1e2e",
                  borderTop: "none",
                  borderRadius: "0 0 8px 8px",
                  padding: "20px 24px",
                  overflowX: "auto",
                  fontSize: 12,
                  lineHeight: 1.8,
                  color: activeTab === "bad" ? "#fca5a5" : "#86efac",
                  margin: "0 0 20px",
                  whiteSpace: "pre",
                }}>
                {activeTab === "bad" ? exercise.bad : exercise.good}
              </pre>

              {/* Reveal / Answer */}
              {!isRevealed ? (
                <button
                  onClick={() => {
                    setRevealed((r) => ({ ...r, [selected]: true }));
                  }}
                  style={{
                    padding: "11px 24px",
                    borderRadius: 8,
                    border: "1px solid #a855f7",
                    background: "linear-gradient(135deg,#a855f715,#f43f5e15)",
                    color: "#d8b4fe",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    letterSpacing: 0.3,
                  }}>
                  💡 Revelar antipatrón y solución
                </button>
              ) : (
                <div>
                  {/* Answer Card */}
                  <div
                    style={{
                      background: "#0d1117",
                      border: "1px solid #1e1e2e",
                      borderLeft: "3px solid #f43f5e",
                      borderRadius: 8,
                      padding: 20,
                      marginBottom: 12,
                    }}>
                    <div style={{ marginBottom: 14 }}>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#475569",
                          textTransform: "uppercase",
                          letterSpacing: 1.2,
                        }}>
                        Antipatrón identificado
                      </span>
                      <p
                        style={{
                          margin: "5px 0 0",
                          fontSize: 15,
                          fontWeight: 700,
                          color: "#f87171",
                        }}>
                        {exercise.antipattern}
                      </p>
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#475569",
                          textTransform: "uppercase",
                          letterSpacing: 1.2,
                        }}>
                        Explicación
                      </span>
                      <p
                        style={{
                          margin: "5px 0 0",
                          fontSize: 12,
                          color: "#94a3b8",
                          lineHeight: 1.8,
                        }}>
                        {exercise.explanation}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("good")}
                    style={{
                      padding: "9px 20px",
                      borderRadius: 7,
                      border: "1px solid #22c55e",
                      background: "#22c55e10",
                      color: "#86efac",
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      letterSpacing: 0.5,
                    }}>
                    Ver código refactorizado →
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
