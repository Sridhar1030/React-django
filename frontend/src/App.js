import axios from 'axios';
import React from 'react';

class App extends React.Component {
  state = {
    details: [],
    searchText: '',
    newEmployee: '',
    newDepartment: '', // Added state for new department data
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get('http://localhost:8000')
      .then(res => {
        this.setState({
          details: res.data,
        });
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  };

  handleInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleNewEmployeeChange = (e) => {
    this.setState({ newEmployee: e.target.value });
  };

  handleNewDepartmentChange = (e) => {
    this.setState({ newDepartment: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Assuming you have a Django endpoint for updating employee and department data
    axios.post('http://localhost:8000/updateEmployee/', {
    employee: this.state.newEmployee,
    department: this.state.newDepartment,
}, { withCredentials: true })
    .then(() => {
        // After successful submission, refetch the data
        this.fetchData();
        // Reset the input fields
        this.setState({ newEmployee: '', newDepartment: '' });
    })
    .catch(error => {
        console.error('Error updating employee and department data:', error.response); // Log the error response
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with status:', error.response.status);
            console.error('Response data:', error.response.data);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from the server');
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
        }
        console.error('Error config:', error.config); // Log the request config
    });

  }

  render() {
    const filteredDetails = this.state.details.filter(output =>
      output.employee.toLowerCase().includes(this.state.searchText.toLowerCase())
    );

    return (
      <div>
        <header>Data from Django</header>
        <hr />

        {/* Search input */}
        <input
          type="text"
          placeholder="Search employee"
          value={this.state.searchText}
          onChange={this.handleInputChange}
        />

        {/* Display filtered details */}
        {filteredDetails.map((output, id) => (
          <div key={id}>
            <div>
              <h2>{output.employee}</h2>
              <h3>{output.department}</h3>
            </div>
          </div>
        ))}

        {/* Form for adding new employee and department */}
        <form onSubmit={this.handleSubmit}>
          <label>
            New Employee:
            <input
              type="text"
              value={this.state.newEmployee}
              onChange={this.handleNewEmployeeChange}
            />
          </label>
          <label>
            New Department:
            <input
              type="text"
              value={this.state.newDepartment}
              onChange={this.handleNewDepartmentChange}
            />
          </label>
          <button type="submit">Add Employee and Department</button>
        </form>
      </div>
    );
  }
}

export default App;
