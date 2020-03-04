# Create Slot Types To Use Across Multiple Skills

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.


## Running the Demo
To start the demo say "alexa open recipe app".  It will tell you what's in your ingredient list.  Say "add {ingredient} to my ingredient list" to recognize and pull an entity for the catalog and move it into the ingredient list

## Steps to Create a Shared Slot

### APIs Used

1. #### **Create Slot Type**

    #### Request

    ```
    URI: POST /v1/skills/api/custom/interactionModel/slotTypes/

    BODY:
    {
        "vendorId": "string",
        "slotType": {
            "name": "string",
            "description": "string"
        }
    }

    ```

    #### Response
        
    ```
    BODY:
    {
        "slotType": {
            "id": "string"
        }
    }
    ```

1. #### **Create Slot Type Version**

    #### Request

    ```
    URI: POST /skills/api/custom/interactionModel/slotTypes/{slotTypeId}/versions

    BODY:
    {
        "slotType": {
            "definition": {...},
            "description": "string"
        }
    }
    ```

    The Definition can be either a inline slot type definition or catalog based slot type definiton
    <table>
    <tr>
    <th>
    Inline Example
    </th>
    <th>
    Catalog Based Example
    </th>
    </tr>

    <tr>
    <td>
    <pre>
    {
        "valueSupplier": {
            "type": "InlineValueSupplier",
            "values": [
                {
                    "id": "seattle",
                    "name": {
                        "value": "seattle",
                        "synonyms": [
                        "sea"
                        ]
                    }
                }
            ]
        }
    }

    </pre>
    </td>
    <td>
    <pre>
    {
        "valueSupplier": {
            "type": "CatalogValueSupplier",
            "valueCatalog": {
                "catalogId": "amzn1.ask.interactionModel.catalog.123",
                "version": "string"
            }
        }
    }
    </pre>
    </td>
    </tr>
    </table>


    #### Response
        
    ```
    HEADER: Location: /v1/skills/api/custom/interactionModel/slotTypes/{slotTypeId}/updateRequest/{updateRequestId}
    ```

1. #### **Get Slot Type Build status**

    #### Request

    ```
    URI: GET /v1/skills/api/custom/interactionModel/slotTypes/{slotTypeId}/updateRequest/{updateRequestId}
    ```

    #### Response
        
    ```
    {
        "updateRequest": {
            "status": "string",
            "version": "string",
        }
    }
    ```



 

