import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
const BatchTable = () => {
  const [batches, setBatches] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/institute/batch');
      const data = await response.json();
      setBatches(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data');
    }
  };

  const handleDeleteClick = (id) => {
    setShowDeleteConfirmation(id);
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const response = await fetch('/api/institute/batch', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        // Delete was successful, update the local state
        document.querySelector("#id"+id).remove();
        toast.success('Batch deleted successfully');
      } else {
        // Delete failed, show error toast
        toast.error(data.message || 'Failed to delete batch');
      }
    } catch (error) {
      // Catch other errors and show an error toast
      console.error('Error deleting batch:', error);
      toast.error('An error occurred while deleting the batch');
    }

    setShowDeleteConfirmation(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(null);
  };

  return (
    <div style={{ overflow: 'scroll' }}>
      <table id="showbatch" style={{ fontSize: 'small' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Institute Name</th>
            <th>Batch Size</th>
            <th>Batch Type</th>
            <th>Course Name</th>
            <th>Course Duration</th>
            <th>Batch Start</th>
            <th>Batch End</th>
            <th>Batch Number</th>
            <th>Batch Fees</th>
            <th>Added By</th>
            <th>Created On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.id} id={"id"+batch.id}>
              <td>{batch.id}</td>
              <td>{batch.instituteName}</td>
              <td>{batch.batchSize}</td>
              <td>{batch.batchType}</td>
              <td>{batch.courseName}</td>
              <td>{batch.courseDuration}</td>
              <td>{batch.batchStart}</td>
              <td>{batch.batchEnd}</td>
              <td>{batch.batchNumber}</td>
              <td>{batch.batchFees}</td>
              <td>{JSON.parse(batch.addedBy)?.name}</td>
              <td>{batch.createdOn}</td>
              <td>
                {showDeleteConfirmation === batch.id ? (
                  <>
                    <span>Are you sure?</span>
                    <button onClick={() => handleDeleteConfirm(batch.id)}>Yes</button>
                    <button onClick={handleDeleteCancel}>No</button>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDeleteClick(batch.id)}
                      style={{ color: 'red', cursor: 'pointer', marginRight: '8px' }}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default BatchTable;
