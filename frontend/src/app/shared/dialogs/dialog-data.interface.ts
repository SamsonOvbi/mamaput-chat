export interface ConfirmDialogData {
  // define the properties and their types here
  message: any;
  image: string;
  name: string;
  // type: 'success' | 'error'| 'warn';  
}

export interface MessageDialogData {
  // define the properties and their types here
  message: any;
  type: 'success' | 'error'| 'warn';  
}

