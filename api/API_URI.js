export const API_DOMAIN = "http://dnsapiud.azurewebsites.net/api/part/";

export const API_TOKEN = "helloworld";

//Dashboard API:
export const DASHBOARD_API = API_DOMAIN + "allParts";

//Dashboard Selected Part Details API:
export const GET_PART_INFO_API = API_DOMAIN + "getByPartNo"; //Pass PartNumber

//Update Inventory Part API:
export const UPDATE_INVENTORY_PART_DETAIL_API = API_DOMAIN + "UpdateLocation?token=" + API_TOKEN;

//Get Parts Automcomplete API:
export const GET_PARTS_API = API_DOMAIN + "GetParts";

//Get SNP Information API:
export const GET_SNP_INFO_API = API_DOMAIN + "snpInfo";

//Generate SNP:
export const GENERATE_SNP_API = API_DOMAIN + "addSnp"; //POST

/* [{
  "part_name":"Engine",
  "part_number":"#EAG2301",
  "inventory_count": 160
},
{
  "part_name":"Windshield",
  "part_number":"#WINAG2301",
  "inventory_count": 140
},
{
  "part_name":"Fuel Pump",
  "part_number":"#FPAG2301",
  "inventory_count": 134
},
{
  "part_name":"Headlamps",
  "part_number":"#HLAG2301",
  "inventory_count": 110
},
{
  "part_name":"Axel",
  "part_number":"#AXAG2301",
  "inventory_count": 80
}] */


/* {
  "total_count":100,
  "primary_Inventory":{
    "max_count": 100,
    "current_count": 60
  },
  "buffer_inventory":[{
      "id": 10,
      "max_count": 100,
      "current_count": 30
  },
  {
    "id": 11,
    "max_count": 100,
    "current_count": 30
  },
  {
    "id": 12,
    "max_count": 100,
    "current_count": 30
  },
  {
    "id": 13,
    "max_count": 100,
    "current_count": 30
  },
  {
    "id": 14,
    "max_count": 100,
    "current_count": 20
  },
  {
    "id": 15,
    "max_count": 100,
    "current_count": 10
  }]
} */
