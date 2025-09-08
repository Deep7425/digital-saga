import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://digitalsaga.in/api/contact');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
        setCurrentPage(1); // Reset to first page when fetching new data
      } else {
        throw new Error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Failed to load contacts');
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load contacts. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#e74c3c'
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getServiceName = (service) => {
    const serviceMap = {
      'web': 'Web & App Development',
      'ai': 'AI Services & Chatbot',
      'seo': 'SEO Optimization',
      'social': 'Social Media Marketing',
      'design': 'Brand Design',
      'analytics': 'Analytics & Reporting',
      'mobile': 'Mobile Marketing',
      'email': 'Email Marketing',
      'consultation': 'General Consultation'
    };
    return serviceMap[service] || service || 'Not specified';
  };

  const handleViewMessage = (contact) => {
    Swal.fire({
      title: `Message from ${contact.name}`,
      html: `
        <div style="text-align: left;">
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone}</p>
          ${contact.company ? `<p><strong>Company:</strong> ${contact.company}</p>` : ''}
          ${contact.service ? `<p><strong>Service:</strong> ${getServiceName(contact.service)}</p>` : ''}
          <p><strong>Date:</strong> ${formatDate(contact.createdAt)}</p>
          <hr style="margin: 15px 0;">
          <p><strong>Message:</strong></p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 10px;">
            ${contact.message}
          </div>
        </div>
      `,
      showCloseButton: true,
      confirmButtonText: 'Close',
      confirmButtonColor: '#6c5ce7',
      width: '600px'
    });
  };

  // Pagination calculations
  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }
    
    return pageNumbers;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading contacts...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {/* "fff" */}
      {/* Header Section */}
      <section className="section bg-light" style={{ paddingTop: '120px' }}>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">Contact Management</h1>
            <p className="lead">View and manage all contact form submissions</p>
          </div>
        </div>
      </section>

      {/* Contacts Table Section */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3>All Contacts ({contacts.length})</h3>
                  {contacts.length > 0 && (
                    <small className="text-muted">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, contacts.length)} of {contacts.length} entries
                    </small>
                  )}
                </div>
                <motion.button 
                  className="btn btn-primary-custom"
                  onClick={fetchContacts}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-sync-alt me-2"></i>
                  Refresh
                </motion.button>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {contacts.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                  <h4>No contacts found</h4>
                  <p className="text-muted">No contact form submissions yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Company</th>
                        <th scope="col">Service</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentContacts.map((contact, index) => (
                        <motion.tr 
                          key={contact.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <th scope="row">{indexOfFirstItem + index + 1}</th>
                          <td>
                            <strong>{contact.name}</strong>
                          </td>
                          <td>
                            <a href={`mailto:${contact.email}`} className="text-decoration-none">
                              {contact.email}
                            </a>
                          </td>
                          <td>
                            <a href={`tel:${contact.phone}`} className="text-decoration-none">
                              {contact.phone}
                            </a>
                          </td>
                          <td>{contact.company || 'N/A'}</td>
                          <td>
                            <span className="badge bg-secondary">
                              {getServiceName(contact.service)}
                            </span>
                          </td>
                          <td>
                            <small className="text-muted">
                              {formatDate(contact.createdAt)}
                            </small>
                          </td>
                          <td>
                            <motion.button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleViewMessage(contact)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="View full message"
                            >
                              <i className="fas fa-eye"></i>
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {contacts.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-4">
                  <nav aria-label="Contacts pagination">
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <motion.button 
                          className="page-link"
                          onClick={handlePreviousPage}
                          disabled={currentPage === 1}
                          whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                          whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                        >
                          <i className="fas fa-chevron-left"></i>
                        </motion.button>
                      </li>
                      
                      {getPageNumbers().map(pageNumber => (
                        <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                          <motion.button 
                            className="page-link"
                            onClick={() => handlePageChange(pageNumber)}
                            whileHover={currentPage !== pageNumber ? { scale: 1.05 } : {}}
                            whileTap={currentPage !== pageNumber ? { scale: 0.95 } : {}}
                          >
                            {pageNumber}
                          </motion.button>
                        </li>
                      ))}
                      
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <motion.button 
                          className="page-link"
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                          whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                        >
                          <i className="fas fa-chevron-right"></i>
                        </motion.button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminContacts; 