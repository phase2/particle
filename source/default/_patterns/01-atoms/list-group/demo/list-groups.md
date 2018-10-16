## Variables

| Name           | Type    | Options     | Description                                                                                                                                                       |
| -------------- | ------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| parent_element | string  | ul,ol,div   | the html element that will contain the list                                                                                                                       |
| list_id        | string  | any         | a unique id for the list                                                                                                                                          |
| items          | object  | any         | the items you wish you put into a list                                                                                                                            |
| item_element   | string  | li,a,div    | the html element that the item will use                                                                                                                           |
| item_classes   | array   | any         | accepts active, disabled, list-group-item-action, list-group-item-(color). See https://getbootstrap.com/docs/4.0/components/list-group/#with-badges for examples. |
| item_text      | string  | any         | the text of the list item                                                                                                                                         |
| list_flush     | boolean | True, False | only use this variable if the list is on a card. this will make it align properly                                                                                 |
