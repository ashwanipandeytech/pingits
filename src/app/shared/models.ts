export interface Commonresponseobject {
  success: boolean;
  data: any;
  message: any;
  error: string;
 
}


export interface ProductcategoryNode {
  name: string;
  subcategories?: ProductcategoryNode[];
}
