import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateBatch() {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [formData, setFormData] = useState({
    instituteName: '',
    batchSize: '',
    batchType: '',
    courseName: '',
    courseDuration: '',
    batchStart: '',
    batchEnd: '',
    batchNumber: '',
    batchFees: '',
    id:''
  });
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const sbtn = useRef();

  useEffect(() => {
    // Fetch data when the component mounts
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await fetch('/api/institute/batch');
      const data = await response.json();
      setBatches(data.data);
    } catch (error) {
      console.error('Error fetching batches:', error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedBatchData = batches.find((batch) => batch.id === selectedId);

    setSelectedBatch(selectedBatchData);

    setFormData({
      instituteName: selectedBatchData.instituteName,
      batchSize: selectedBatchData.batchSize,
      batchType: selectedBatchData.batchType,
      courseName: selectedBatchData.courseName,
      courseDuration: selectedBatchData.courseDuration,
      batchStart: selectedBatchData.batchStart,
      batchEnd: selectedBatchData.batchEnd,
      batchNumber: selectedBatchData.batchNumber,
      batchFees: selectedBatchData.batchFees,
      id:selectedId
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedBatch) {
      toast.error('Please select a batch to update');
      return;
    }

    try {
      setButtonDisabled(true);

      const response = await fetch(`/api/institute/batch`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.error) {
        toast.success('Batch updated successfully');
        fetchBatches();
        setFormData({
          instituteName: '',
          batchSize: '',
          batchType: '',
          courseName: '',
          courseDuration: '',
          batchStart: '',
          batchEnd: '',
          batchNumber: '',
          batchFees: '',
          id:''
        });
        setSelectedBatch(null);
      } else {
        toast.error(data.message || 'Failed to update batch');
      }
    } catch (error) {
      console.error('Error updating batch:', error);
      toast.error('An error occurred while updating the batch');
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <>
      <div className="rounded bg-slate-700 m-2 p-3 shadow-4">
        <form onSubmit={handleUpdate}>
          <label htmlFor="selectBatch">Select Batch ID:</label>
          <select
            id="selectBatch"
            className="form-control mb-2"
            onChange={handleSelectChange}
            value={selectedBatch ? selectedBatch.id : ''}
          >
            <option value="" disabled>
              Select Batch ID
            </option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.id}
              </option>
            ))}
          </select>

          <label htmlFor="instituteName">Institute Name :</label>
          <input
            id="instituteName"
            type="text"
            className="form-control mb-2"
            required
            value={formData.instituteName}
            onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
          />

          <label htmlFor="batchSize">Batch Size :</label>
          <input
            id="batchSize"
            type="text"
            className="form-control mb-2"
            required
            value={formData.batchSize}
            onChange={(e) => setFormData({ ...formData, batchSize: e.target.value })}
          />

          <label htmlFor="batchType">Batch Type :</label>
          <input
            id="batchType"
            type="text"
            className="form-control mb-2"
            required
            value={formData.batchType}
            onChange={(e) => setFormData({ ...formData, batchType: e.target.value })}
          />

          <label htmlFor="courseName">Course Name :</label>
          <input
            id="courseName"
            type="text"
            className="form-control mb-2"
            required
            value={formData.courseName}
            onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
          />

          <label htmlFor="courseDuration">Course Duration :</label>
          <input
            id="courseDuration"
            type="text"
            className="form-control mb-2"
            required
            value={formData.courseDuration}
            onChange={(e) => setFormData({ ...formData, courseDuration: e.target.value })}
          />

          <label htmlFor="batchStart">Batch Start Date :</label>
          <input
            id="batchStart"
            type="date"
            className="form-control mb-2"
            required
            value={formData.batchStart}
            onChange={(e) => setFormData({ ...formData, batchStart: e.target.value })}
          />

          <label htmlFor="batchEnd">Batch End Date :</label>
          <input
            id="batchEnd"
            type="date"
            className="form-control mb-2"
            required
            value={formData.batchEnd}
            onChange={(e) => setFormData({ ...formData, batchEnd: e.target.value })}
          />

          <label htmlFor="batchNumber">Batch Number :</label>
          <input
            id="batchNumber"
            type="text"
            className="form-control mb-2"
            required
            value={formData.batchNumber}
            onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
          />

          <label htmlFor="batchFees">Batch Fees in Rupees :</label>
          <input
            id="batchFees"
            type="number"
            className="form-control mb-2"
            required
            value={formData.batchFees}
            onChange={(e) => setFormData({ ...formData, batchFees: e.target.value })}
          />

          <button
            type="submit"
            className="btn btn-primary rounded"
            ref={sbtn}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? 'Updating...' : 'Update Batch'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
