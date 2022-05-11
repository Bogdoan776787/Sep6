import { Controller } from "react-hook-form";
import {CostumizedFieldInputController} from "./FieldInputControllerStyled" 




const FieldInputController = (props) => {
  return     <Controller
  name={props.name}
  control={props.control}
  rules={props.rules}
  render={({ field }) => 
    <CostumizedFieldInputController
        {...field}
        id={props.id} 
        label={props.label}
        variant={props.variant}
        type = {props.type}     
        error={props.error? true:false}
        {...props.value}
        
        />
  }
  defaultValue=""
/>;
};



export default FieldInputController;