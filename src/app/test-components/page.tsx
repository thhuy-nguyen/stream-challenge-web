import Link from "next/link";

export default function TestComponents() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">DaisyUI v5 Component Test</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <button className="btn">Default</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-ghost">Ghost</button>
          <button className="btn btn-link">Link</button>
          <button className="btn btn-outline">Outline</button>
          <button className="btn btn-soft">Soft</button>
          <button className="btn btn-dash">Dash</button>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="btn btn-xs">xs</button>
          <button className="btn btn-sm">sm</button>
          <button className="btn">md</button>
          <button className="btn btn-lg">lg</button>
          <button className="btn btn-xl">xl</button>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <span className="badge">Default</span>
          <span className="badge badge-neutral">Neutral</span>
          <span className="badge badge-primary">Primary</span>
          <span className="badge badge-secondary">Secondary</span>
          <span className="badge badge-accent">Accent</span>
          <span className="badge badge-soft">Soft</span>
          <span className="badge badge-dash">Dash</span>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Alert</h2>
        <div className="space-y-4">
          <div className="alert">
            <span>Default Alert</span>
          </div>
          <div className="alert alert-info">
            <span>Info Alert</span>
          </div>
          <div className="alert alert-success">
            <span>Success Alert</span>
          </div>
          <div className="alert alert-warning">
            <span>Warning Alert</span>
          </div>
          <div className="alert alert-error">
            <span>Error Alert</span>
          </div>
          <div className="alert alert-info alert-soft">
            <span>Soft Info Alert</span>
          </div>
          <div className="alert alert-success alert-dash">
            <span>Dash Success Alert</span>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Default Card</h2>
              <p>Basic card with title and content</p>
            </div>
          </div>
          
          <div className="card card-xl bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">XL Card</h2>
              <p>New XL size support in DaisyUI v5</p>
            </div>
          </div>
          
          <div className="card card-dash bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Dash Card</h2>
              <p>New dash variant in DaisyUI v5</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl image-full">
            <figure><div className="w-full h-48 bg-primary-focus/20"></div></figure>
            <div className="card-body">
              <h2 className="card-title">Image Card</h2>
              <p>Card with full-width image background</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-medium mb-2">Checkbox</h3>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Default</span>
                <input type="checkbox" className="checkbox" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Primary</span>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">XL Size</span>
                <input type="checkbox" className="checkbox checkbox-xl" />
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">Toggle</h3>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Default</span>
                <input type="checkbox" className="toggle" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Primary</span>
                <input type="checkbox" className="toggle toggle-primary" />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">XL Size</span>
                <input type="checkbox" className="toggle toggle-xl" />
              </label>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">New Components in v5</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">List Component</h3>
          <ul className="list">
            <li>
              <div className="list-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="list-content">
                <div className="list-title">New List Component</div>
                <div className="list-desc">A structured list element with icons and descriptions</div>
              </div>
            </li>
            <li>
              <div className="list-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="list-content">
                <div className="list-title">Improved Components</div>
                <div className="list-desc">Many improvements to existing components</div>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Status Component</h3>
          <div className="flex flex-wrap gap-4">
            <div className="status">
              <div className="status-indicator">
                <div className="status-spinner"></div>
              </div>
              <div className="status-text">Processing</div>
            </div>
            
            <div className="status">
              <div className="status-indicator status-success">
                <div className="status-check"></div>
              </div>
              <div className="status-text">Success</div>
            </div>
            
            <div className="status">
              <div className="status-indicator status-warning">
                <div className="status-alert"></div>
              </div>
              <div className="status-text">Warning</div>
            </div>
            
            <div className="status">
              <div className="status-indicator status-error">
                <div className="status-close"></div>
              </div>
              <div className="status-text">Error</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-2">Fieldset Component</h3>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Personal Information</legend>
            <div className="fieldset-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </section>
      
      <div className="mt-10">
        <Link href="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
}