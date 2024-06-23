import Swal, { SweetAlertOptions } from 'sweetalert2';

export class AllConstants {
  public static genericError: string = 'Something went wrong!! Please try again!!';

  public static unauthorized: string = 'You are not authorized to view this page!';

  public static productExistError: string = 'Product already exists';
  public static productNotFound: string = 'Product not found';

  public static productAdded: string = 'Product added successfully';
  public static addedToCart: string = 'added to the cart';

  public static nameRegex: string = '[a-zA-Z0-9 ]*';

  public static emailRegex: string = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
  public static emailSent: string = 'Email sent successfully.';

  public static contactNumberRegex: string = '^[e0-9]{10,11}$';

  public static error: string = 'error';
  public static success: string = 'success';
}

export enum DialogType {
  success = 'success',
  Warn = 'warn',
  error = 'error'
}

export const swalFireWarning = {
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
};

export const swalFireError = {
  title: 'Oops...',
  text: "Something Went Wrong",
  icon: 'error',
};

export const swalMixin = {
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast: any) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
};
