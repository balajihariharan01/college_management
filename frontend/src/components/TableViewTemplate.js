import React, { useState } from 'react'

const TableViewTemplate = ({ columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Pagination logic
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-textDark/10 overflow-hidden">
            <div className="overflow-x-auto w-full border-b border-textDark/10">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="bg-surface/60 border-b border-textDark/10">
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`py-4 px-6 text-sm font-extrabold text-brand uppercase tracking-wider ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}`}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-textDark/5">
                        {paginatedRows.length > 0 ? (
                            paginatedRows.map((row) => (
                                <tr key={row.id} className="hover:bg-brand/5 transition-colors duration-200 group">
                                    {columns.map((column, index) => {
                                        const value = row[column.id];
                                        return (
                                            <td
                                                key={index}
                                                className={`py-4 px-6 text-sm font-medium text-textDark/90 group-hover:text-textDark transition-colors ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}`}
                                            >
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="py-8 text-center text-textDark/60 font-medium">
                                    No data available to display.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {rows.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 bg-white/40">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-textDark/70 font-medium">Rows per page:</span>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setPage(0);
                            }}
                            className="bg-transparent border border-textDark/20 rounded-lg text-sm px-2 py-1 font-bold text-textDark focus:ring-2 focus:ring-accent outline-none"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-textDark">
                            {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, rows.length)} of {rows.length}
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 0}
                                className={`p-1.5 rounded-lg transition-colors ${page === 0 ? 'text-textDark/30 cursor-not-allowed' : 'text-textDark hover:bg-surface hover:text-brand'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page >= totalPages - 1}
                                className={`p-1.5 rounded-lg transition-colors ${page >= totalPages - 1 ? 'text-textDark/30 cursor-not-allowed' : 'text-textDark hover:bg-surface hover:text-brand'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TableViewTemplate