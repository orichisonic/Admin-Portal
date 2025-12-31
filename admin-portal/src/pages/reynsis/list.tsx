import { useList } from "@refinedev/core";
import { useState, useEffect } from "react";

interface ReynsisRecord {
  id: number;
  // 根据你的实际表结构添加字段
  name?: string;
  created_at?: string;
  created_by?: string;
  // 添加其他字段...
}

export const ReynsisList: React.FC = () => {
  const [data, setData] = useState<ReynsisRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { query } = useList<ReynsisRecord>({
    resource: "reynsis",
  });

  useEffect(() => {
    if (query.isLoading) {
      setIsLoading(true);
    } else if (query.error) {
      setError(query.error.message);
      setIsLoading(false);
    } else if (query.data) {
      setData(query.data.data);
      setError(null);
      setIsLoading(false);
    }
  }, [query.isLoading, query.error, query.data]);

  if (isLoading) {
    return <div className="p-4">加载中...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        加载失败: {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reynsis 列表</h1>
      
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 text-left font-medium">ID</th>
              <th className="border-b px-4 py-2 text-left font-medium">名称</th>
              <th className="border-b px-4 py-2 text-left font-medium">创建时间</th>
                    <th className="border-b px-4 py-2 text-left font-medium">创建人</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((record) => (
                <tr key={record.id}>
                  <td className="border-b px-4 py-2">{record.id}</td>
                  <td className="border-b px-4 py-2">{record.name || "-"}</td>
                  <td className="border-b px-4 py-2">
                    {record.created_at 
                      ? new Date(record.created_at).toLocaleString() 
                      : "-"
                    }
                  </td>
                   <td className="border-b px-4 py-2">{record.created_by || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="h-24 text-center">
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          共 {query.data?.total || data.length} 条记录
        </div>
      </div>
    </div>
  );
};
