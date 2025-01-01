(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_6b4aee._.js", {

"[project]/app/components/KanbanBoard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$beautiful$2d$dnd$2f$dist$2f$react$2d$beautiful$2d$dnd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
// Create a client-side only component
const KanbanBoardContent = ({ initialTasks })=>{
    _s();
    console.log('KanbanBoard received tasks:', initialTasks);
    console.log('Task states:', initialTasks?.map((t)=>t.state));
    console.log('Filtered ToDo tasks:', initialTasks?.filter((task)=>task.state === "ToDo"));
    if (!initialTasks?.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Loading tasks..."
        }, void 0, false, {
            fileName: "[project]/app/components/KanbanBoard.tsx",
            lineNumber: 26,
            columnNumber: 12
        }, this);
    }
    const [columns, setColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "KanbanBoardContent.useState": ()=>[
                {
                    id: "TODO",
                    title: "To Do",
                    tasks: initialTasks.filter({
                        "KanbanBoardContent.useState": (task)=>task.state === "ToDo"
                    }["KanbanBoardContent.useState"]) || []
                },
                {
                    id: "IN_PROGRESS",
                    title: "In Progress",
                    tasks: initialTasks.filter({
                        "KanbanBoardContent.useState": (task)=>task.state === "InProgress"
                    }["KanbanBoardContent.useState"]) || []
                },
                {
                    id: "COMPLETED",
                    title: "Completed",
                    tasks: initialTasks.filter({
                        "KanbanBoardContent.useState": (task)=>task.state === "Completed"
                    }["KanbanBoardContent.useState"]) || []
                }
            ]
    }["KanbanBoardContent.useState"]);
    // Add useEffect to update columns when initialTasks changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KanbanBoardContent.useEffect": ()=>{
            setColumns([
                {
                    id: "TODO",
                    title: "To Do",
                    tasks: initialTasks?.filter({
                        "KanbanBoardContent.useEffect": (task)=>task.state === "ToDo"
                    }["KanbanBoardContent.useEffect"]) || []
                },
                {
                    id: "IN_PROGRESS",
                    title: "In Progress",
                    tasks: initialTasks?.filter({
                        "KanbanBoardContent.useEffect": (task)=>task.state === "InProgress"
                    }["KanbanBoardContent.useEffect"]) || []
                },
                {
                    id: "COMPLETED",
                    title: "Completed",
                    tasks: initialTasks?.filter({
                        "KanbanBoardContent.useEffect": (task)=>task.state === "Completed"
                    }["KanbanBoardContent.useEffect"]) || []
                }
            ]);
        }
    }["KanbanBoardContent.useEffect"], [
        initialTasks
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-4 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$beautiful$2d$dnd$2f$dist$2f$react$2d$beautiful$2d$dnd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DragDropContext"], {
            onDragEnd: onDragEnd,
            children: columns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-100 p-4 rounded-lg w-80",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-bold mb-4",
                            children: column.title
                        }, void 0, false, {
                            fileName: "[project]/app/components/KanbanBoard.tsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$beautiful$2d$dnd$2f$dist$2f$react$2d$beautiful$2d$dnd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Droppable"], {
                            droppableId: column.id,
                            isDropDisabled: false,
                            isCombineEnabled: false,
                            children: (provided)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ...provided.droppableProps,
                                    ref: provided.innerRef,
                                    className: "min-h-[500px]",
                                    children: [
                                        column.tasks.map((task, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$beautiful$2d$dnd$2f$dist$2f$react$2d$beautiful$2d$dnd$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Draggable"], {
                                                draggableId: String(task.id),
                                                index: index,
                                                children: (provided)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        ref: provided.innerRef,
                                                        ...provided.draggableProps,
                                                        ...provided.dragHandleProps,
                                                        className: "bg-white p-4 mb-2 rounded shadow",
                                                        children: task.text
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/KanbanBoard.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 25
                                                    }, this)
                                            }, String(task.id), false, {
                                                fileName: "[project]/app/components/KanbanBoard.tsx",
                                                lineNumber: 136,
                                                columnNumber: 21
                                            }, this)),
                                        provided.placeholder
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/KanbanBoard.tsx",
                                    lineNumber: 130,
                                    columnNumber: 17
                                }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/KanbanBoard.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this)
                    ]
                }, column.id, true, {
                    fileName: "[project]/app/components/KanbanBoard.tsx",
                    lineNumber: 122,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/KanbanBoard.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/KanbanBoard.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
};
_s(KanbanBoardContent, "TuMAiBs+RxTMmElCv95rO8y0794=");
_c = KanbanBoardContent;
// Wrap with dynamic import
const KanbanBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_c1 = ()=>Promise.resolve(KanbanBoardContent), {
    ssr: false
});
_c2 = KanbanBoard;
const __TURBOPACK__default__export__ = KanbanBoard;
var _c, _c1, _c2;
__turbopack_refresh__.register(_c, "KanbanBoardContent");
__turbopack_refresh__.register(_c1, "KanbanBoard$dynamic");
__turbopack_refresh__.register(_c2, "KanbanBoard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/member/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>MemberPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$KanbanBoard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/components/KanbanBoard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
function MemberPage() {
    _s();
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MemberPage.useEffect": ()=>{
            // Fetch tasks
            const fetchTasks = {
                "MemberPage.useEffect.fetchTasks": async ()=>{
                    const response = await fetch('/api');
                    const data = await response.json();
                    console.log('Fetched tasks:', data);
                    setTasks(data);
                }
            }["MemberPage.useEffect.fetchTasks"];
            fetchTasks();
        }
    }["MemberPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-4",
                children: "My Tasks"
            }, void 0, false, {
                fileName: "[project]/app/member/page.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$KanbanBoard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                initialTasks: tasks
            }, void 0, false, {
                fileName: "[project]/app/member/page.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/member/page.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(MemberPage, "bBd6yqkqV9dlkj9ENgRyXKaiXpk=");
_c = MemberPage;
var _c;
__turbopack_refresh__.register(_c, "MemberPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/member/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_6b4aee._.js.map