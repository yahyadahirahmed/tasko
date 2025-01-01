module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/app/components/KanbanBoard.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>KanbanBoard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$beautiful$2d$dnd$2f$dist$2f$react$2d$beautiful$2d$dnd$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function KanbanBoard({ initialTasks }) {
    // Initialize columns with tasks
    const [columns, setColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: "TODO",
            title: "To Do",
            tasks: initialTasks.filter((task)=>task.state === "ToDo")
        },
        {
            id: "IN_PROGRESS",
            title: "In Progress",
            tasks: initialTasks.filter((task)=>task.state === "InProgress")
        },
        {
            id: "COMPLETED",
            title: "Completed",
            tasks: initialTasks.filter((task)=>task.state === "Completed")
        }
    ]);
    const onDragEnd = (result)=>{
        const { source, destination } = result;
        // If dropped outside a droppable area
        if (!destination) return;
        // If dropped in the same position
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
        // Find source and destination columns
        const sourceColumn = columns.find((col)=>col.id === source.droppableId);
        const destColumn = columns.find((col)=>col.id === destination.droppableId);
        if (!sourceColumn || !destColumn) return;
        // Create new arrays
        const newSourceTasks = Array.from(sourceColumn.tasks);
        const newDestTasks = source.droppableId === destination.droppableId ? newSourceTasks : Array.from(destColumn.tasks);
        // Remove task from source
        const [movedTask] = newSourceTasks.splice(source.index, 1);
        // Add task to destination
        if (source.droppableId === destination.droppableId) {
            newSourceTasks.splice(destination.index, 0, movedTask);
        } else {
            newDestTasks.splice(destination.index, 0, movedTask);
        }
        // Update columns state
        setColumns((prevColumns)=>prevColumns.map((col)=>{
                if (col.id === source.droppableId) {
                    return {
                        ...col,
                        tasks: newSourceTasks
                    };
                }
                if (col.id === destination.droppableId) {
                    return {
                        ...col,
                        tasks: newDestTasks
                    };
                }
                return col;
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-4 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$beautiful$2d$dnd$2f$dist$2f$react$2d$beautiful$2d$dnd$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DragDropContext"], {
            onDragEnd: onDragEnd,
            children: columns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-100 p-4 rounded-lg w-80",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-bold mb-4",
                            children: column.title
                        }, void 0, false, {
                            fileName: "[project]/app/components/KanbanBoard.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$beautiful$2d$dnd$2f$dist$2f$react$2d$beautiful$2d$dnd$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Droppable"], {
                            droppableId: column.id,
                            isDropDisabled: false,
                            isCombineEnabled: false,
                            children: (provided)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ...provided.droppableProps,
                                    ref: provided.innerRef,
                                    className: "min-h-[500px]",
                                    children: [
                                        column.tasks.map((task, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$beautiful$2d$dnd$2f$dist$2f$react$2d$beautiful$2d$dnd$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Draggable"], {
                                                draggableId: task.id,
                                                index: index,
                                                children: (provided)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        ref: provided.innerRef,
                                                        ...provided.draggableProps,
                                                        ...provided.dragHandleProps,
                                                        className: "bg-white p-4 mb-2 rounded shadow",
                                                        children: task.text
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/KanbanBoard.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 25
                                                    }, this)
                                            }, task.id, false, {
                                                fileName: "[project]/app/components/KanbanBoard.tsx",
                                                lineNumber: 106,
                                                columnNumber: 21
                                            }, this)),
                                        provided.placeholder
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/KanbanBoard.tsx",
                                    lineNumber: 100,
                                    columnNumber: 17
                                }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/KanbanBoard.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this)
                    ]
                }, column.id, true, {
                    fileName: "[project]/app/components/KanbanBoard.tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/KanbanBoard.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/KanbanBoard.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
}}),
"[project]/app/admin/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__d851d9._.js.map