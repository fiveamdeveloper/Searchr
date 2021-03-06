import SearchResults from './SearchResults/SearchResults';
import SearchField from './SearchField/SearchField';
import { useEffect, useState } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import Helmet from 'react-helmet';

function App() {

    // initialize useState and update function für searchParameter and searchResults
    const [searchParameter, setSearchParameter] = useState("_")
    const [searchResults, setSearchResults] = useState([])
    console.log(searchParameter)

    useEffect(() => {
        const getData = fetch(`http://localhost:8983/solr/mycore/select?q=title:${searchParameter}^4 OR content:${searchParameter}^1 OR description:${searchParameter}^1&rows=200&sort=boost desc`)
            .then(res => res.json())
            .then(res => setSearchResults([res]))
            .catch(error => console.log(error))
    }, [searchParameter])

    console.log(searchParameter)
    console.log("Search results are", searchResults)

    return (
        <div className="application">
            <Helmet>
                <title>Searchr</title>
            </Helmet>

            <div className='Container mx-auto mb-5'>
                <div className='d-flex mt-5 flex-column align-items-center justify-content-center'>
                    <div className='col-6 mb-1 '>
                        <h1 className='text-center '><a className="text-body text-decoration-none" href="/">Searchr</a></h1>
                        <p className='text-center'>Eine Suchmaschine basierend auf Apache Nutch</p>
                    </div>
                    <div className='col-6 mb-3'>
                        <div className='input-group'>
                            <SearchField setSearchParameter={setSearchParameter} />
                        </div>
                    </div>

                    <div className='col-6'>
                        {
                            // this is causing issues!
                            /* searchResults[0].length >= 1 &&
                         <p>Es wurden <strong>{searchResults[0].response.numFound}</strong> Ergebnisse in <strong>{
                             searchResults[0].responseHeader.Qtime = 0 && 0 &&
                             searchResults[0].responseHeader.Qtime}</strong> Milisekunden gefunden.</p>*/
                        }
                        <ul className="list-group">
                            <SearchResults data={searchResults} />
                        </ul>
                    </div>

                </div >

            </div>

        </div>
    )
}

export default App;