import{a as e}from"./dist-A40YWdDJ.js";import{t}from"./app-Cud7XyS4.js";import{t as n}from"./SiteLayout-DA2Byo7-.js";var r=t();function i({postId:t}){let{data:n,setData:i,post:a,processing:o,reset:s,errors:c,wasSuccessful:l}=e({name:``,email:``,comment:``});return(0,r.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),a(`/blog/${t}/comment`,{onSuccess:()=>s(),preserveScroll:!0})},className:`mt-8 mb-12 space-y-4 rounded-2xl bg-gray-50 p-8 border border-gray-100`,children:[(0,r.jsx)(`h4`,{className:`font-bold text-gray-900 text-lg`,children:`Leave a Reply`}),(0,r.jsxs)(`div`,{className:`grid gap-4 sm:grid-cols-2`,children:[(0,r.jsx)(`input`,{type:`text`,placeholder:`Name`,required:!0,value:n.name,onChange:e=>i(`name`,e.target.value),className:`w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-primary shadow-sm`}),(0,r.jsx)(`input`,{type:`email`,placeholder:`Email`,required:!0,value:n.email,onChange:e=>i(`email`,e.target.value),className:`w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-primary shadow-sm`})]}),(0,r.jsx)(`textarea`,{rows:4,placeholder:`Your comment...`,required:!0,value:n.comment,onChange:e=>i(`comment`,e.target.value),className:`w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-primary shadow-sm`}),(0,r.jsx)(`button`,{type:`submit`,disabled:o,className:`inline-flex items-center gap-2 rounded-xl bg-gray-900 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-primary shadow-lg disabled:opacity-50`,children:o?`Submitting...`:`Post Comment`}),l&&(0,r.jsx)(`p`,{className:`text-sm font-medium text-primary mt-2`,children:`✓ Your comment is awaiting approval!`})]})}function a({post:e}){return(0,r.jsxs)(n,{children:[(0,r.jsxs)(`div`,{className:`min-h-screen bg-white`,children:[(0,r.jsxs)(`header`,{className:`container mx-auto max-w-4xl px-6 pt-16 pb-8`,children:[(0,r.jsx)(`h1`,{className:`text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl leading-tight`,children:e.title}),e.cover_image&&(0,r.jsx)(`div`,{className:`mt-8`,children:(0,r.jsx)(`img`,{src:e.cover_image,alt:e.title,className:`w-full rounded-2xl object-cover shadow-sm max-h-[500px]`})})]}),(0,r.jsxs)(`main`,{className:`container mx-auto max-w-4xl px-6 pb-24`,children:[(0,r.jsx)(`article`,{className:`prose prose-emerald max-w-none`,children:(0,r.jsx)(`div`,{className:`bg-white`,dangerouslySetInnerHTML:{__html:e.content||``}})}),(0,r.jsxs)(`section`,{className:`mt-20 pt-10 border-t border-gray-100`,children:[(0,r.jsxs)(`h3`,{className:`text-2xl font-bold text-gray-900 mb-8`,children:[`Comments (`,e.comments?.length||0,`)`]}),(0,r.jsx)(i,{postId:e.id}),(0,r.jsx)(`div`,{className:`space-y-8`,children:e.comments?.map(e=>(0,r.jsx)(`div`,{className:`flex gap-4 p-6 rounded-2xl bg-gray-50`,children:(0,r.jsxs)(`div`,{className:`flex-1`,children:[(0,r.jsxs)(`div`,{className:`flex items-center justify-between mb-2`,children:[(0,r.jsx)(`h5`,{className:`font-bold text-gray-900`,children:e.name}),(0,r.jsx)(`span`,{className:`text-xs text-gray-400`,children:new Date(e.created_at).toLocaleDateString()})]}),(0,r.jsx)(`p`,{className:`text-gray-600`,children:e.comment}),e.reply&&(0,r.jsxs)(`div`,{className:`mt-4 rounded-xl bg-primary/5 p-4 border-l-4 border-primary`,children:[(0,r.jsx)(`span`,{className:`text-xs font-bold text-primary uppercase block mb-1`,children:`Reply`}),(0,r.jsxs)(`p`,{className:`italic text-gray-800`,children:[`"`,e.reply,`"`]})]})]})},e.id))})]})]})]}),(0,r.jsx)(`style`,{children:`
        /* Screenshot Accurate Styles */
        .prose h2 { font-size: 1.875rem; font-weight: 800; margin-top: 2.5rem; margin-bottom: 1.25rem; color: #111827; }
        .prose h3 { font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #111827; }
        .prose p { margin-bottom: 1.5rem; line-height: 1.7; color: #374151; font-size: 1.05rem; }
        
        .blog-tip { 
            background: #f0fdf4 !important; 
            border-left: 4px solid #10b981 !important; 
            padding: 1.5rem !important; 
            border-radius: 0.5rem !important; 
            margin: 2rem 0 !important; 
        }
        .blog-tip h4 { color: #065f46 !important; font-weight: 700 !important; margin-bottom: 0.5rem !important; margin-top: 0 !important; }
        
        .blog-grid { 
            display: grid !important; 
            grid-template-columns: 1fr 1fr !important; 
            gap: 1.5rem !important; 
            margin: 2.5rem 0 !important; 
        }
        @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr !important; } }
        
        .blog-card { 
            border: 1px solid #f3f4f6 !important; 
            padding: 1.5rem !important; 
            border-radius: 0.75rem !important; 
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important; 
            background: white !important;
        }
        .blog-card h4 { font-weight: 700 !important; margin-bottom: 0.5rem !important; margin-top: 0 !important; color: #111827 !important; }
        
        .blog-cta { 
            background: #10b981 !important; 
            color: white !important; 
            padding: 2.5rem !important; 
            border-radius: 0.75rem !important; 
            text-align: center !important; 
            margin: 3rem 0 !important; 
        }
        .blog-cta h3 { color: white !important; font-weight: 800 !important; margin-bottom: 1rem !important; margin-top: 0 !important; }
        .blog-cta a { 
            display: inline-block !important; 
            background: white !important; 
            color: #10b981 !important; 
            padding: 0.75rem 2rem !important; 
            border-radius: 0.5rem !important; 
            font-weight: 700 !important; 
            text-decoration: none !important; 
            margin-top: 1rem !important; 
        }
      `})]})}export{a as default};