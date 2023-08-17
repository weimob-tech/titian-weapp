## This is Code Snippets of Titian for VS Code. (Titian Version: v1.0.0)

### Snippets List

1.Currently, only work in .wxml file and .js file.

### Autocomplete

![titian.gif](https://tva1.sinaimg.cn/large/5e739df7gy1gyj48enxp7g20of08sdhi.gif)

#### Basic Part (6)

| No. | Trigger&nbsp;Key | Titian Tag     |
| :-: | :--------------: | :------------- |
| 1.  |     `tiimg`      | `<ti-img>`     |
| 2.  |     `tiicon`     | `<ti-icon>`    |
| 3.  |    `tibutton`    | `<ti-button>`  |
| 4.  |     `titag`      | `<ti-tag>`     |
| 5.  |     `ticell`     | `<ti-cell>`    |
| 6.  |   `tidivider`    | `<ti-divider>` |

#### Layout Part (3)

| No. | Trigger&nbsp;Key | Titian Tag                |
| :-: | :--------------: | :------------------------ |
| 1.  |    `tilayout`    | `<ti-row><ti-col>`        |
| 2.  |    `tisticky`    | `<ti-sticky>`             |
| 3.  |     `tigrid`     | `<ti-grid><ti-grid-item>` |

#### Form Part (14)

| No. |     Trigger Key     | Titian Tag             |
| :-: | :-----------------: | :--------------------- |
| 1.  |      `tiinput`      | `<ti-input>`           |
| 2.  |    `titextarea`     | `<ti-textarea>`        |
| 3.  |     `tiswitch`      | `ti-switch`            |
| 5.  |      `tiradio`      | `<ti-radio>`           |
| 6.  |    `ticheckbox`     | `<ti-checkbox>`        |
| 7.  |      `tirate`       | `<ti-rate>`            |
| 8.  |     `tislider`      | `<ti-slider>`          |
| 9.  |  `tiinput-number`   | `<ti-input-number>`    |
| 10. |    `tiuploader`     | `<ti-uploader>`        |
| 11. |     `tisearch`      | `<ti-search>`          |
| 12. |     `tipicker`      | `<ti-picker>`          |
| 13. | `tidatetime-picker` | `<ti-datetime-picker>` |
| 14. |    `ticalendar`     | `<ti-calendar>`        |

#### Display Part (6)

| No. |  Trigger Key   | Titian Tag        |
| :-: | :------------: | :---------------- |
| 1.  | `ticountdown`  | `<ti-countdown>`  |
| 2.  |  `tiprogress`  | `<ti-progress>`   |
| 3.  |   `tiempty`    | `<ti-empty>`      |
| 4.  |   `tisteps`    | `<ti-steps>`      |
| 5.  |   `tibadge`    | `<ti-badge>`      |
| 6.  | `tinotice-bar` | `<ti-notice-bar>` |

#### Action Part (12)

| No. |    Trigger Key     | Titian Tag                             |
| :-: | :----------------: | :------------------------------------- |
| 1.  |     `titoast`      | `<ti-toast>`                           |
| 2.  |    `titooltip`     | `<ti-tooltip>`                         |
| 3.  |     `tipopup`      | `<ti-popup>`                           |
| 4.  | `tipopup-titlebar` | `<ti-popup-titlebar>`                  |
| 5.  |     `tidialog`     | `<ti-dialog>`                          |
| 6.  |  `tiaction-sheet`  | `<ti-action-sheet>`                    |
| 7.  |  `tishare-sheet`   | `<ti-share-sheet>`                     |
| 8.  |    `ticollapse`    | `<ti-collapse><ti-collapse-item>`      |
| 9.  | `tidropdown-menu`  | `<ti-dropdown-menu><ti-dropdown-item>` |
| 10. |    `tiloading`     | `<ti-loading>`                         |
| 11. |    `tiback-top`    | `<ti-back-top>`                        |
| 12. |   `tiswipe-cell`   | `<ti-swipe-cell>`                      |

#### Navigation Part (4)

| No. |   Trigger Key   | Titian Tag                      |
| :-: | :-------------: | :------------------------------ |
| 1.  |   `tisidebar`   | `<ti-sidebar><ti-sidebar-item>` |
| 2.  | `titree-select` | `<ti-tree-select>`              |
| 3.  |    `titabs`     | `<ti-tabs>`                     |
| 4.  |   `titabbar`    | `<ti-tabbar><ti-tabbar-item>`   |

#### JS Part (8)

| No. |    Trigger Key    | Titian Tag                                                                                                                                                                           |
| :-: | :---------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.  | `import titoast`  | `import { $tiToast } from 'titian-mp/index'`                                                                                                                                         |
| 2.  |  `titoast.info`   | `$tiToast().info({text: ""}`                                                                                                                                                         |
| 3.  | `titoast.loading` | `$tiToast().loading({text: ""}`                                                                                                                                                      |
| 4.  |  `titoast.warn`   | `$tiToast().warn({text: ""}`                                                                                                                                                         |
| 5.  | `titoast.success` | `$tiToast().success({text: ""}`                                                                                                                                                      |
| 6.  |  `titoast.fail`   | `$tiToast().fail({text: ""}`                                                                                                                                                         |
| 7.  | `import tidialog` | `import { $tiDialog } from 'titian-mp/index';`                                                                                                                                       |
| 8.  |  `tidialog.show`  | <pre>$tiDialog().show({<br> title: '',<br> content: '',<br> confirmText: '确定',<br> cancelText: '取消', <br> hasCancelButton: true <br> onConfirm(){},<br> onCancel(){}<br>})</pre> |
