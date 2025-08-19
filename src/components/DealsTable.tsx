"use client";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { deals as staticDeals } from '../data/deals';


import type { Deal } from '../data/deals';
const allColumns: { key: keyof Deal | string; label: string; sortable: boolean; filterable: boolean; minWidth: number }[] = [
  { key: 'name', label: 'Name', sortable: true, filterable: true, minWidth: 160 },
  { key: 'owner', label: 'Owner', sortable: true, filterable: true, minWidth: 120 },
  { key: 'stage', label: 'Stage', sortable: true, filterable: true, minWidth: 110 },
  { key: 'status', label: 'Status', sortable: true, filterable: true, minWidth: 110 },
  { key: 'amount', label: 'Amount', sortable: true, filterable: true, minWidth: 120 },
  { key: 'created', label: 'Created', sortable: true, filterable: false, minWidth: 120 },
  { key: 'updated', label: 'Updated', sortable: true, filterable: false, minWidth: 120 },
  { key: 'custom1', label: 'Custom 1', sortable: false, filterable: false, minWidth: 140 },
  { key: 'custom2', label: 'Custom 2', sortable: false, filterable: false, minWidth: 140 },
  { key: 'custom3', label: 'Custom 3', sortable: false, filterable: false, minWidth: 140 },
  { key: 'custom4', label: 'Custom 4', sortable: false, filterable: false, minWidth: 140 },
  { key: 'custom5', label: 'Custom 5', sortable: false, filterable: false, minWidth: 140 },
  { key: 'custom6', label: 'Custom 6', sortable: false, filterable: false, minWidth: 140 },
  { key: 'custom7', label: 'Custom 7', sortable: false, filterable: false, minWidth: 140 },
  { key: 'custom8', label: 'Custom 8', sortable: false, filterable: false, minWidth: 140 },
  { key: 'custom9', label: 'Custom 9', sortable: false, filterable: false, minWidth: 140 },
  { key: 'custom10', label: 'Custom 10', sortable: false, filterable: false, minWidth: 140 },
];

function getStageColor(stage: string) {
  switch (stage) {
    case 'New': return 'bg-blue-100 text-blue-700';
    case 'Qualified': return 'bg-yellow-100 text-yellow-800';
    case 'Won': return 'bg-green-100 text-green-800';
    case 'Lost': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800';
    case 'Stalled': return 'bg-yellow-100 text-yellow-800';
    case 'Closed': return 'bg-gray-200 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

export default function DealsTable() {
  const [visibleCols, setVisibleCols] = useState(() => [
    'name', 'owner', 'stage', 'status', 'amount', 'created', 'updated',
    'custom1', 'custom2', 'custom3', 'custom4'
  ]);
  const [colOrder, setColOrder] = useState(() => allColumns.map(c => c.key));
  const [colWidths, setColWidths] = useState<Record<string, number>>({});
  const [headerMenu, setHeaderMenu] = useState<{ x: number; y: number; colKey: string } | null>(null);
  const [rowMenu, setRowMenu] = useState<{ x: number; y: number; rowId: string } | null>(null);
  const [sort, setSort] = useState<{ key: keyof Deal; dir: 'asc' | 'desc' }[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const deals = staticDeals;
  
  const columns = colOrder
    .filter(key => visibleCols.includes(key))
    .map(key => allColumns.find(c => c.key === key)!)

  
  const sortedDeals = useMemo(() => {
    const arr = [...deals];
    for (let i = sort.length - 1; i >= 0; i--) {
      const { key, dir } = sort[i];
      arr.sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[key];
        const bVal = (b as Record<string, unknown>)[key];
        
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return dir === 'asc' ? aVal - bVal : bVal - aVal;
        }
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        if (aStr < bStr) return dir === 'asc' ? -1 : 1;
        if (aStr > bStr) return dir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return arr;
  }, [deals, sort]);

  
  const filteredDeals = useMemo(() => {
    return sortedDeals.filter((deal) =>
      columns.every(col => {
        if (!filters[col.key]) return true;
        
        if (!(col.key in deal)) return true;
        const value = (col.key in deal) ? (deal as Record<string, unknown>)[col.key] : '';
        return String(value ?? '').toLowerCase().includes((filters[col.key] ?? '').toLowerCase());
      })
    );
  }, [sortedDeals, filters, columns]);

  
  const lastSelected = useRef<string | null>(null);
  const toggleSelect = (id: string, multi = false, range = false) => {
    setSelected(prev => {
      let next = new Set(prev);
      if (range && lastSelected.current && lastSelected.current !== id) {
        
        const ids = filteredDeals.map(d => d.id);
        const start = ids.indexOf(lastSelected.current);
        const end = ids.indexOf(id);
        if (start !== -1 && end !== -1) {
          const [from, to] = start < end ? [start, end] : [end, start];
          for (let i = from; i <= to; i++) next.add(ids[i]);
        }
      } else if (multi) {
        if (next.has(id)) next.delete(id); else next.add(id);
      } else {
        next = new Set([id]);
      }
      lastSelected.current = id;
      return next;
    });
  };

  
  const handleSort = (key: string, shift: boolean) => {
    setSort(prev => {
      const idx = prev.findIndex(s => s.key === key);
      if (idx !== -1) {
        
        const dir = prev[idx].dir === 'asc' ? 'desc' : 'asc';
        const updated = [...prev];
        updated[idx] = { key: key as keyof Deal, dir };
        return shift ? updated : [{ key: key as keyof Deal, dir }];
      } else {
        return shift ? [...prev, { key: key as keyof Deal, dir: 'asc' }] : [{ key: key as keyof Deal, dir: 'asc' }];
      }
    });
  };

  
  const handleFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  
  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  
  const totals = useMemo(() => {
    return {
      amount: filteredDeals.reduce((sum, d) => sum + d.amount, 0),
      count: filteredDeals.length,
      avg: filteredDeals.length ? Math.round(filteredDeals.reduce((sum, d) => sum + d.amount, 0) / filteredDeals.length) : 0,
    };
  }, [filteredDeals]);

  
  const tableRef = useRef<HTMLTableElement>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
      }
    };
    const table = tableRef.current;
    table?.addEventListener('keydown', handler);
    return () => table?.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300">
      
      <div className="flex items-center gap-2 p-2">
        <button
          className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={e => setHeaderMenu({ x: e.currentTarget.getBoundingClientRect().left, y: e.currentTarget.getBoundingClientRect().bottom, colKey: '__columns__' })}
        >
          Columns ▾
        </button>
      </div>
      <div className="relative">
        <div className="max-h-[700px] overflow-y-auto w-full">
          <table ref={tableRef} className="min-w-[900px] w-full text-sm text-gray-900 dark:text-gray-100" tabIndex={0} aria-label="Deals table">
            <thead className="sticky top-0 z-30">
              <tr>
                <th className="sticky left-0 z-40 bg-white dark:bg-gray-900 px-3 py-2 border-b border-gray-200 dark:border-gray-700">Select</th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={
                      'px-3 py-2 border-b border-gray-200 dark:border-gray-700 font-semibold whitespace-nowrap bg-white dark:bg-gray-900 z-30 relative group' +
                      (col.key === 'name' ? ' sticky left-[56px] z-30' : '')
                    }
                    style={{ minWidth: colWidths[col.key] ?? col.minWidth, width: colWidths[col.key] ?? col.minWidth }}
                    onContextMenu={e => {
                      e.preventDefault();
                      setHeaderMenu({ x: e.clientX, y: e.clientY, colKey: col.key as string });
                    }}
                    draggable
                    onDragStart={e => {
                      e.dataTransfer.setData('colKey', col.key as string);
                    }}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                      const fromKey = e.dataTransfer.getData('colKey');
                      if (!fromKey || fromKey === col.key) return;
                      setColOrder(order => {
                        const idxFrom = order.indexOf(fromKey);
                        const idxTo = order.indexOf(col.key);
                        if (idxFrom === -1 || idxTo === -1) return order;
                        const newOrder = [...order];
                        newOrder.splice(idxFrom, 1);
                        newOrder.splice(idxTo, 0, fromKey);
                        return newOrder;
                      });
                    }}
                  >
                    <button
                      className="flex items-center gap-1 group focus:outline-none"
                      onClick={e => handleSort(col.key, e.shiftKey)}
                      aria-label={`Sort by ${col.label}`}
                    >
                      {col.label}
                      {(() => {
                        const s = sort.find(s => s.key === col.key);
                        if (!s) return null;
                        return (
                          <span className="ml-1 text-xs group-hover:text-blue-600 dark:group-hover:text-yellow-400">
                            {s.dir === 'asc' ? '↑' : '↓'}
                          </span>
                        );
                      })()}
                    </button>
                    {/* Resize handle */}
                    <span
                      className="absolute top-0 right-0 h-full w-2 cursor-col-resize group-hover:bg-blue-100 dark:group-hover:bg-gray-700"
                      onMouseDown={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const startX = e.clientX;
                        const startWidth = colWidths[col.key] ?? col.minWidth;
                        const onMove = (moveEvent: MouseEvent) => {
                          const delta = moveEvent.clientX - startX;
                          setColWidths(w => ({ ...w, [col.key]: Math.max(60, startWidth + delta) }));
                        };
                        const onUp = () => {
                          document.removeEventListener('mousemove', onMove);
                          document.removeEventListener('mouseup', onUp);
                        };
                        document.addEventListener('mousemove', onMove);
                        document.addEventListener('mouseup', onUp);
                      }}
                    />
                    {col.filterable && (
                      <input
                        className="mt-1 w-full px-1 py-0.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs rounded focus:ring-2 focus:ring-blue-200 dark:focus:ring-yellow-400"
                        type="text"
                        placeholder={`Filter`}
                        value={filters[col.key] || ''}
                        onChange={e => handleFilter(col.key, e.target.value)}
                        aria-label={`Filter by ${col.label}`}
                      />
                    )}
                  </th>
                ))}
                <th className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 z-30">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map(deal => (
                <React.Fragment key={deal.id}>
                  <tr
                    className={('hover:bg-blue-50 dark:hover:bg-gray-800 transition ' + (selected.has(deal.id) ? 'bg-blue-100 dark:bg-gray-800' : ''))}
                    tabIndex={0}
                    aria-selected={selected.has(deal.id)}
                    onClick={e => {
                      if (e.shiftKey) {
                        toggleSelect(deal.id, false, true);
                      } else if (e.ctrlKey || e.metaKey) {
                        toggleSelect(deal.id, true, false);
                      } else {
                        toggleSelect(deal.id, false, false);
                      }
                    }}
                    onDoubleClick={() => toggleExpand(deal.id)}
                    onContextMenu={e => {
                      e.preventDefault();
                      setRowMenu({ x: e.clientX, y: e.clientY, rowId: deal.id });
                    }}
                  >
                    <td className="sticky left-0 z-10 bg-white dark:bg-gray-900 px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                      <input
                        type="checkbox"
                        checked={selected.has(deal.id)}
                        onClick={e => {
                          const event = e as React.MouseEvent<HTMLInputElement, MouseEvent>;
                          if (event.shiftKey) {
                            toggleSelect(deal.id, false, true);
                          } else if (event.ctrlKey || event.metaKey) {
                            toggleSelect(deal.id, true, false);
                          } else {
                            toggleSelect(deal.id, false, false);
                          }
                        }}
                        onChange={() => {}}
                        aria-label="Select row"
                      />
                    </td>
                    {columns.map(col => (
                      <td
                        key={col.key}
                        className={('px-3 py-2 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap ' + (col.key === 'name' ? 'sticky left-[56px] z-0 bg-white dark:bg-gray-900' : ''))}
                        style={{ minWidth: colWidths[col.key] ?? col.minWidth, width: colWidths[col.key] ?? col.minWidth }}
                      >
                        {col.key === 'stage' ? (
                          <span className={('inline-block px-2 py-0.5 rounded-full text-xs font-semibold ' + getStageColor(deal.stage))}>
                            {deal.stage}
                          </span>
                        ) : col.key === 'status' ? (
                          <span className={('inline-block px-2 py-0.5 rounded-full text-xs font-semibold ' + getStatusColor(deal.status))}>
                            {deal.status}
                          </span>
                        ) : col.key === 'amount' ? (
                          <span title={`Amount: $${deal.amount.toLocaleString()}`}>${deal.amount.toLocaleString()}</span>
                        ) : col.key.startsWith('custom') ? (
                          <span className="text-xs text-gray-400 dark:text-gray-600">—</span>
                        ) : (
                          String((deal as Record<string, unknown>)[col.key] ?? '')
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                      <button
                        className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 focus:outline-none"
                        aria-label="Row actions"
                        tabIndex={0}
                        onClick={e => {
                          e.stopPropagation();
                          setRowMenu({ x: e.currentTarget.getBoundingClientRect().left, y: e.currentTarget.getBoundingClientRect().bottom, rowId: deal.id });
                        }}
                      >
                        ⋮
                      </button>
                    </td>
                  </tr>
                  {expanded.has(deal.id) && (
                    <tr className="bg-blue-50 dark:bg-gray-800">
                      <td colSpan={columns.length + 2} className="px-6 py-3 text-sm text-gray-700 dark:text-gray-200">
                        <div>
                          <strong>Details for {deal.name}</strong>
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Owner: {deal.owner} | Created: {deal.created} | Updated: {deal.updated}</div>
                          <div className="mt-2">Activity: <span className="italic">(sub-table/activity placeholder)</span></div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
            <tfoot className="sticky bottom-0 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <tr>
                <td className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-800 px-3 py-2 font-semibold">Totals</td>
                {columns.map(col => (
                  <td key={col.key} className="px-3 py-2 font-semibold">
                    {col.key === 'amount' ? `$${totals.amount.toLocaleString()}` : col.key === 'name' ? `${totals.count} deals` : col.key === 'owner' ? `Avg: $${totals.avg}` : ''}
                  </td>
                ))}
                <td className="px-3 py-2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        {headerMenu && (
          <div
            className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg text-sm"
            style={{ left: headerMenu.x, top: headerMenu.y, minWidth: 180 }}
            onMouseLeave={() => setHeaderMenu(null)}
          >
            {headerMenu.colKey === '__columns__' ? (
              <div>
                <div className="px-3 py-2 font-semibold border-b border-gray-200 dark:border-gray-700">Show/Hide Columns</div>
                {allColumns.map(col => (
                  <label key={col.key} className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                    <input
                      type="checkbox"
                      checked={visibleCols.includes(col.key)}
                      onChange={() => setVisibleCols(v => v.includes(col.key) ? v.filter(k => k !== col.key) : [...v, col.key])}
                    />
                    {col.label}
                  </label>
                ))}
              </div>
            ) : (
              <div>
                <div className="px-3 py-2 font-semibold border-b border-gray-200 dark:border-gray-700">Column Actions</div>
                <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { setHeaderMenu(null); alert('Column action: Sort'); }}>Sort</button>
                <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { setHeaderMenu(null); setVisibleCols(v => v.filter(k => k !== headerMenu.colKey)); }}>Hide</button>
                {/* Add more column actions here */}
              </div>
            )}
          </div>
        )}
        
        {rowMenu && (
          <div
            className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg text-sm"
            style={{ left: rowMenu.x, top: rowMenu.y, minWidth: 160 }}
            onMouseLeave={() => setRowMenu(null)}
          >
            <div className="px-3 py-2 font-semibold border-b border-gray-200 dark:border-gray-700">Row Actions</div>
            <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { setRowMenu(null); alert('Row action: Edit ' + rowMenu.rowId); }}>Edit</button>
            <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { setRowMenu(null); alert('Row action: Delete ' + rowMenu.rowId); }}>Delete</button>
          </div>
        )}
        
        {selected.size > 0 && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg rounded px-6 py-2 flex gap-4 items-center z-50 animate-fade-in">
            <span>{selected.size} selected</span>
            <button className="text-blue-600 dark:text-yellow-400 hover:underline">Bulk Action</button>
            <button className="text-gray-500 dark:text-gray-300 hover:underline" onClick={() => setSelected(new Set())}>Clear</button>
          </div>
        )}
      </div>
    </div>
  );
}
