import { Refine } from "@refinedev/core";
import { dataProvider } from "@refinedev/supabase";
import { supabaseClient } from "../utils/supabaseClient";
import { Route, Routes, Link } from 'react-router-dom';
import { ReynsisList } from '../pages/reynsis/list';

export function App() {
  return (
    <Refine
      dataProvider={dataProvider(supabaseClient)}
    >
      <div>
        <h1 className="text-2xl font-bold mb-6">Admin Portal with Supabase</h1>
        
        {/* Navigation */}
        <div role="navigation" className="mb-6">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-600 hover:underline">首页</Link>
            </li>
            <li>
              <Link to="/reynsis" className="text-blue-600 hover:underline">Reynsis 列表</Link>
            </li>
          </ul>
        </div>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">欢迎来到 Admin Portal</h2>
                <p className="text-gray-600">
                  这是一个基于 Refine + Supabase + shadcn/ui 的管理面板。
                </p>
                <div className="mt-4">
                  <Link 
                    to="/reynsis" 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    查看 Reynsis 数据
                  </Link>
                </div>
              </div>
            }
          />
          <Route
            path="/reynsis"
            element={<ReynsisList />}
          />
        </Routes>
      </div>
    </Refine>
  );
}

export default App;
