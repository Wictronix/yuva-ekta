export function exportToCSV(data: Record<string, any>[], filename: string) {
  if (!data || data.length === 0) return;

  // Extract headers
  const headers = Object.keys(data[0]);

  // Create CSV string
  const csvContent = [
    headers.join(","),
    ...data.map(row => 
      headers.map(header => {
        const val = row[header];
        if (val === null || val === undefined) return "";
        // Escape quotes and wrap in quotes if there's a comma
        const strVal = String(val).replace(/"/g, '""');
        return `"${strVal}"`;
      }).join(",")
    )
  ].join("\n");

  // Download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
