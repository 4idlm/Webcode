import React  from 'react';
import { FaUserEdit, FaRegTrashAlt} from "react-icons/fa";
import ChunkData from '../Store';

class DataTables  extends React.Component {
    
    
    render() {
       
          let ListData = ChunkData.ResponseData !== "" ? ChunkData.ResponseData.map((data,index)=>{
            return <tr key={index}>
              <td>{data.horse_name}</td>
            <td>{data.horse_number}</td>
            <td>{data.age_verified}</td>
            <td>{data.color}</td>
            <td><FaUserEdit/></td>
            <td onClick={(event)=>this.props.delete(event,data.id)}><FaRegTrashAlt/></td>
            </tr>
            }):"...Loading";
        return(
            <React.Fragment>
                
            <table className="table table-striped">
            <thead>
              <tr>
                <th>Horse Name</th>
                <th>Number</th>
                <th>Age</th>
                <th>Color</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {ListData}
            </tbody>
          </table>
           
          </React.Fragment>
           
        )
    }
}

export default DataTables ;
 