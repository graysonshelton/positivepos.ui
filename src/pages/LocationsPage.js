// src/pages/LocationsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL 

const LocationsPage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesRes, locationsRes] = await Promise.all([
          axios.get(`${API_URL}/companies`),
          axios.get(`${API_URL}/locations`)
        ]);

        const companiesWithLocations = companiesRes.data.map(company => ({
          ...company,
          locations: locationsRes.data.filter(loc => loc.companyId === company.companyId)
        }));

        setCompanies(companiesWithLocations);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <h2>Companies and Locations</h2>
      <div className="accordion" id="companyAccordion">
        {companies.map((company, idx) => (
          <div className="accordion-item" key={company.companyId}>
            <h2 className="accordion-header" id={`heading-${idx}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${idx}`}
                aria-expanded="false"
                aria-controls={`collapse-${idx}`}
              >
                {company.name} (ID: {company.companyId})
              </button>
            </h2>
            <div
              id={`collapse-${idx}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading-${idx}`}
              data-bs-parent="#companyAccordion"
            >
              <div className="accordion-body">
                <div className="card">
                  <div className="card-body">
                    <table className="table table-vcenter card-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(company.locations || []).map(location => (
                          <tr key={location.locationId}>
                            <td>{location.locationId}</td>
                            <td>{location.name}</td>
                            <td>{location.address}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
