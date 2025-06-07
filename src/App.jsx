import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Logo from './assets/Logo.png'
import Alert from './assets/AlertCircle.png'
import Notif from './assets/Notification.png'
import Avatar from './assets/avatar.jpg'
import icon_1 from './assets/icon_1.png'
import icon_2 from './assets/icon_2.png'
import icon_3 from './assets/icon_3.png'
import icon_4 from './assets/icon_4.png'
import icon_5 from './assets/icon_5.png'
import icon_6 from './assets/icon_6.png'
import icon from './assets/Icon.png'
import doc_icon from './assets/doc_icon.png'
import next from './assets/NextButton.png'
import prev from './assets/ChevronLeft.png'
import wrapper from './assets/IconWrapper.png'
import search from './assets/search.png'
import exp from './assets/Export.png'
import search2 from './assets/search2.png'
import { useMemo } from 'react'
function App() {
  const [activeTab, setActiveTab] = useState("Hosts");
   const [searchTerm, setSearchTerm] = useState("");
    const [timeFilter, setTimeFilter] = useState("Weekly")
     const [typeFilter, setTypeFilter] = useState("All")
      const [sortDirection, setSortDirection] = useState("desc")
   const reportData = [
    {
      id: "20230401",
      hostName: "BEAT",
      hostIP: "192.128.0.100",
      executionName: "BEAT",
      startDate: "2021-02-05 08:28:36",
      progress: 55,
      type: "Template",
      executedBy: "Shreya",
      status: "success",
    },
    {
      id: "20230401",
      hostName: "Monthly_scan_3",
      hostIP: "192.128.0.100",
      executionName: "Monthly_scan_3",
      startDate: "2021-02-03 19:49:33",
      progress: 30,
      type: "Testcase",
      executedBy: "Mayank",
      status: "warning",
    },
    {
      id: "20230401",
      hostName: "Weekly_report_2",
      hostIP: "192.128.0.100",
      executionName: "Weekly_report_2",
      startDate: "2021-02-02 19:17:15",
      progress: 95,
      type: "Template",
      executedBy: "Vignesh",
      status: "success",
    },
    {
      id: "20230401",
      hostName: "Weekly_report_2",
      hostIP: "192.128.0.100",
      executionName: "Weekly_report_2",
      startDate: "2021-02-02 19:17:15",
      progress: 30,
      type: "Testcase",
      executedBy: "Vignesh",
      status: "error",
    },
    {
      id: "20230401",
      hostName: "Weekly_report_2",
      hostIP: "192.128.0.100",
      executionName: "Weekly_report_2",
      startDate: "2021-02-02 19:17:15",
      progress: 80,
      type: "Template",
      executedBy: "Mayank",
      status: "success",
    },
  ]
const fuzzySearch=(str, query)=>{
  if (!query) return true
   str = str.toLowerCase();   // case-insensitive: convert both to lowercase
   query = query.toLowerCase();
  
   let i = 0;                         // index for characters in query
   let lastSearched = -1;            // keeps track of position in str
   let current = query[i];           // first char of query

   while (current) {
      // search for 'current' in str, starting after last match
      lastSearched = str.indexOf(current, lastSearched + 1);

      if (lastSearched === -1) {
         return false;               // char not found → not fuzzy match
      }

      current = query[++i];          // move to next char in query
   }

   return true; 



}
    const filteredData = useMemo(() => {
    let result = reportData;

    if (timeFilter === "Weekly") {
      result = result.filter(d => d.executionName.toLowerCase().includes("weekly"));
    } else if (timeFilter === "Monthly") {
      result = result.filter(d => d.executionName.toLowerCase().includes("monthly"));
    } else if (timeFilter === "Yearly") {
      result = result.filter(d => d.executionName.toLowerCase().includes("year"));
    }else if(timeFilter=='All'){
      result=result;
    }

    // Apply fuzzy search
    if (searchTerm) {
      result = result.filter(
        (item) =>
          fuzzySearch(item.hostName, searchTerm) ||
          fuzzySearch(item.executionName, searchTerm) ||
          fuzzySearch(item.executedBy, searchTerm) ||
          fuzzySearch(item.type, searchTerm) ||
          fuzzySearch(item.id, searchTerm),
      )
    }

    // Filter by type
    if (typeFilter !== "All") {
      result = result.filter((item) => item.type === typeFilter)
    }

       result.sort((a, b) => {
      const dateA = new Date(a.startDate)
      const dateB = new Date(b.startDate)
      return sortDirection === "desc" ? dateB - dateA : dateA - dateB
    })
    
   

    return result;
  }, [timeFilter, searchTerm, typeFilter, reportData, sortDirection]);



   const getProgressBarClass = (status) => {
    switch (status) {
      case "success":
        return "progress-success"
      case "warning":
        return "progress-warning"
      case "error":
        return "progress-error"
      default:
        return "progress-success"
    }
  }

   const sidebarItems = [
    { name: "Dashboard", icon: icon_1, active: false },
    { name: "Environments", icon: icon_2, active: false, hasSubmenu: true },
    { name: "Executions", icon: icon_3, active: false },
    { name: "Configuration", icon: icon_4, active: false },
    { name: "Reports", icon: icon_5, active: true },
    { name: "Administration", icon: icon_6, active: false, hasSubmenu: true },
  ]
  const exportToCSV = () => {

  const headers = ["Host Nam", "Host IP", 'Execution Name', 'Start Date', 'Executoon State', 'Type', 'Executed By'];
  
  const rows = filteredData.map(row => {
    console.log(row.startDate)
   return [row.hostName, row.hostIP, row.executionName, "\t" + row.startDate, row.progress,row.type, row.executedBy]
  }
    );

  let csvContent = "data:text/csv;charset=utf-8," 
    + [headers, ...rows].map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "exported_table_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (

 <div className='app'>

    <header className="header-grid">
        <div className="header-left">
          <div><img src={Logo}/></div>
          <div className="search-container">
            <div style={{height:'fit-content', display:"flex", gap:'10px', flex:'2'}}>
               <img src={search2}/>
            <input type="text" placeholder="Search" className="search-input" />
            </div>
           
            <span className="search-shortcut">⌘K</span>
          </div>
        </div>
        <div className="header-right">
          <button className="help-btn"><img src={Alert}></img></button>
          <div className="notification-badge">
            <span className="notification-icon"><img src={Notif}/></span>
            <span className="badge">2</span>
          </div>
          <div className="user-profile">
            <span>John Doe</span>
            <div className="avatar"><img src={Avatar} style={{height:"28px", width:"28px"}}></img></div>
          </div>
        </div>
      </header>

    <div className='main-container'>
      <div className='side-bar'>
        <div className='side-bar-nav'>
          {
            sidebarItems.map((item,index)=>(
              <div key={index} style={{display:'flex', alignItems:"center", justifyContent:'space-around'}} >
                <div className={`side-bar-item ${item.active ? "active" : ""}`}>
                  <span style={{height:"20px", width:"20px"}}><img src={item.icon} style={{height:"20px", width:"20px"}}></img></span>
                  <span>{item.name}</span>
                  {item.hasSubmenu && <span className="submenu-arrow">›</span>}
                </div>
                
                
              </div>
            ))
          }
        </div>
        <div className='footer'>
          <div style={{display:'flex', alignItems:"center", justifyContent:'space-around', paddingBottom:"8px"}} >
            <div className='side-bar-item'>
              <span>
                ⚙️
              </span>
              <span>Settings</span>
            </div>
          </div>
           
        </div>
      </div>

      <div className='main-content'>
          <div className="breadcrumb">
            <span style={{fontWeight:"650", fontSize:"20px"}}>← Reports</span>
            <p className="breadcrumb-desc" style={{color:'#616161', fontSize:'12px', fontWeight:"450"}}>View reports for hosts and projects scans</p>
          </div>

          <div className='outer-table'>
            <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start", gap:"10px", padding:"16px 8px"}}> 
              <button className={`tab ${activeTab === "Hosts" ? "active" : ""}`} onClick={() => setActiveTab("Hosts")}>
              Hosts
            </button>
            <button
              className={`tab ${activeTab === "Projects" ? "active" : ""}`}
              onClick={() => setActiveTab("Projects")}
            >
              Projects
            </button>
            </div>
            <div className='filters-container'>
              <div style={{fontSize:"14px", fontWeight:"650", color:"black"}}>
                HOSTS
              </div>
               <div className="filter-buttons">
                <div className='filter-div'>
                  <button className={`filter-btn ${timeFilter === 'All' ? "active" : ""}`} onClick={()=>setTimeFilter('All')} >All</button>
                  <button className={`filter-btn ${timeFilter === 'Weekly' ? "active" : ""}`} onClick={()=>setTimeFilter('Weekly')} >Weekly</button>
                  <button className={`filter-btn ${timeFilter === 'Monthly' ? "active" : ""}`} onClick={()=>setTimeFilter('Monthly')}>Monthly</button>
                  <button className={`filter-btn ${timeFilter === 'Yearly'? "active" : ""}`} onClick={()=>setTimeFilter('Yearly')}>Yearly</button>
                  <button className={`filter-btn ${timeFilter === 'Custom' ? "active" : ""}`} onClick={()=>setTimeFilter('Custom')}>Custom</button>
                </div>
               
                <div className='action-controls'>
                  <div className="filter-dropdown">
                      <button className="action-btn">Filter <img src={wrapper}></img> </button>
                       <div className="filter-menu">
                        <div className="filter-group">
                        <label>Type:</label>
                        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                          <option value="All">All Types</option>
                          <option value="Template">Template</option>
                          <option value="Testcase">Test case</option>
                        </select>
                      </div>
                        </div>

                  </div>
              
                </div> 
                <div className="sort-dropdown">
                    <button className="action-btn">Sort <img src={wrapper}></img></button>
                    <div className="sort-menu">
                      <button onClick={() => setSortDirection("desc")}>
                        Newest First {sortDirection === "desc" && "✓"}
                      </button>
                      <button onClick={() => setSortDirection("asc")}>
                        Oldest First {sortDirection === "asc" && "✓"}
                      </button>
                    </div>
                  </div>

                
                <div className='search-div'>
                  <button><img src={search}></img></button>
                 <input
                  type="text"
                  placeholder="Search"
                  className="search-table"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
                

                <button className="export-btn" onClick={()=>exportToCSV()}><img src={exp}/> Export</button>
              </div>
              {/* <div className="action-buttons"> */}
                
              {/* </div> */}
            </div>
            <div className='table-container'>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Execution ID</th>
                    <th>Host Name</th>
                    <th>Host IP</th>
                    <th>Execution Name</th>
                    <th>Start Date</th>
                    <th>Execution State</th>
                    <th>Type</th>
                    <th>Executed by</th>
                    <th>Logs</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <a href="#" className="execution-link">
                          {row.id}
                        </a>
                      </td>
                      <td>{row.hostName}</td>
                      <td>{row.hostIP}</td>
                      <td>{row.executionName}</td>
                      <td>{row.startDate}</td>
                      <td>
                        <div className="progress-container">
                          <div className={`progress-bar ${getProgressBarClass(row.status)}`}>
                            <div className="progress-fill" style={{ width: `${row.progress}%` }}></div>
                          </div>
                          <span className="progress-text">{row.progress}%</span>
                        </div>
                      </td>
                      <td>{row.type}</td>
                      <td>{row.executedBy}</td>
                      <td>
                        <div className="action-cell">
                          <button className="log-btn"><img src={icon}/></button>
                          <button className="action-btn-small"><img src={doc_icon}></img></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                 
                </tbody>
              </table>
              <div className='footer-row'>
                  <button><img src={prev}/></button>
                  <button> <img src={next}/></button>

              </div>

            </div>

          </div>

      </div>

    </div>
   

</div>
  )
}

export default App
