import * as React from 'react';
import JqxForm, { IFormProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxform';
import JqxLayout, { ILayoutProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxlayout';
import JqxInput, { IInputProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxinput';
import JqxComboBox, { IComboBoxProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxcombobox';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxButtonGroup, { IButtonGroupProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttongroup';
import JqxTabs, { ITabsProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import JqxCheckBox, { ICheckBoxProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxcheckbox';
import JqxDateTimeInput, { IDateTimeInputProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxdatetimeinput';
import JqxDataTable, { IDataTableProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxdatatable';
import JqxTextArea, { ITextAreaProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtextarea';
import JqxDropDownList, { IDropDownListProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxdropdownlist';
import JqxNotification, { INotificationProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification';
import JqxWindow from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxwindow';
import DiaChi2 from './frmTd copy 2';
import { ApiClient } from "./api";
let api = new ApiClient();
interface MyComponentProps { /* declare your component's props here */ }
interface MyComponentState {
    width: string,
    source: Array<string>,
    templateTD: Array<Object>,
    columns: Array<Object>,
    tableSource: Object,
    formData: Object,
    dmhuyen: Array<Object>,
    dmxa: Array<Object>,
    showPopupDiaChi: boolean
}

// class App extends React.PureComponent<{}, ITabsProps> {
class App extends React.Component<MyComponentProps, MyComponentState> {
    private myForm = React.createRef<JqxForm>();
    private formTD = React.createRef<JqxForm>();
    private formMDSD = React.createRef<JqxForm>();
    private myLayout = React.createRef<JqxLayout>();
    private myComboBox = React.createRef<JqxComboBox>();
    private myButtonGroup = React.createRef<JqxButtonGroup>();
    private myDataTable = React.createRef<JqxDataTable>();
    private cbHuyen = React.createRef<JqxDropDownList>();
    private cbXa = React.createRef<JqxDropDownList>();
    private myNotification = React.createRef<JqxNotification>();
    private labelWidth = '110px';
    _isMounted = false;


    private myWindow = React.createRef<JqxWindow>();

    constructor(props) {
        super(props);
        let me = this;
        this.state = {
            width: '100%',
            formData: {},
            dmhuyen: [],
            dmxa: [],
            tableSource: new jqx.dataAdapter({}),
            columns: [
                { text: 'Mục đích sử dụng', dataField: 'mdsd' },
                { text: 'Diện tích', dataField: 'dientich' }
            ],
            source: [],
            templateTD:
                [
                    {
                        columns: [
                            {
                                columnWidth: '25%',
                                bind: 'huyen',
                                name: 'huyen',
                                type: 'custom',
                                label: 'Quận/huyện',
                                labelWidth: this.labelWidth,
                                width: '100%',
                                init: function (component) {
                                    component.jqxDropDownList({
                                        source: me.state.dmhuyen,
                                        displayMember: 'ten',
                                        filterPlaceHolder: 'Gõ để tìm kiếm',
                                        valueMember: 'ma',
                                        width: '100%',
                                        searchMode: 'containsignorecase',
                                        enableBrowserBoundsDetection: true,
                                        filterable: true
                                    })
                                }
                            },
                            {
                                columnWidth: '25%',
                                bind: 'xa',
                                type: 'custom',
                                label: 'Xã/phường',
                                name: 'xa',
                                labelWidth: this.labelWidth,
                                width: '100%',
                                init: function (component) {
                                    component.jqxDropDownList({
                                        source: me.state.dmxa,
                                        displayMember: 'ten',
                                        filterPlaceHolder: 'Gõ để tìm kiếm',
                                        valueMember: 'ma',
                                        width: '100%',
                                        searchMode: 'containsignorecase',
                                        enableBrowserBoundsDetection: true,
                                        filterable: true
                                    });
                                }
                            },
                            {
                                columnWidth: '25%',
                                bind: 'sonha',
                                type: 'text',
                                label: 'Số nhà',
                                labelPosition: 'left',
                                labelWidth: this.labelWidth,
                                align: 'left',
                                width: '100%'
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                columnWidth: '25%',
                                type: 'text',
                                label: 'Số thửa',
                                bind: 'sothua',
                                labelPosition: 'left',
                                labelWidth: this.labelWidth,
                                align: 'left',
                                width: '100%'
                            },
                            {
                                columnWidth: '25%',
                                bind: 'soto',
                                type: 'text',
                                label: 'Số tờ',
                                labelPosition: 'left',
                                labelWidth: this.labelWidth,
                                align: 'left',
                                width: '100%'
                            },
                            {
                                columnWidth: '25%',
                                type: 'text',
                                label: 'Diện tích',
                                bind: 'dientich',
                                labelPosition: 'left',
                                labelWidth: this.labelWidth,
                                align: 'left',
                                width: '100%',
                                required: true
                            },
                            {
                                columnWidth: '25%',
                                type: 'text',
                                label: 'DT pháp lý',
                                labelPosition: 'left',
                                labelWidth: this.labelWidth,
                                align: 'left',
                                width: '100%',
                                required: true
                            }

                        ]
                    },
                    {
                        columns: [
                            {
                                columnWidth: '25%',
                                type: 'text',
                                label: 'Số thửa cũ',
                                bind: 'sothuacu',
                                labelPosition: 'left',
                                labelWidth: this.labelWidth,
                                align: 'left',
                                width: '100%'
                            },
                            {
                                columnWidth: '25%',
                                type: 'text',
                                label: 'Số tờ cũ',
                                bind: 'sotocu',
                                labelPosition: 'left',
                                labelWidth: this.labelWidth,
                                align: 'left',
                                width: '100%'
                            },
                            {
                                columnWidth: '8%',
                                type: 'blank'
                            },
                            {
                                columnWidth: '20%',
                                bind: 'sd_sohieuto',
                                type: 'boolean',
                                label: 'Sử dụng số hiệu tờ,thửa cũ',
                                labelPosition: 'right',
                                width: '100%',
                            },
                            {
                                columnWidth: '10%',
                                type: 'boolean',
                                bind: 'ddt',
                                label: 'Đất đô thị',
                                labelPosition: 'right',
                                width: '100%',
                            },
                            {
                                bind: 'kdc',
                                columnWidth: '10%',
                                type: 'boolean',
                                label: 'Khu dân cư',
                                labelPosition: 'right',
                                width: '100%'
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                columnWidth: '48%',
                                type: 'text',
                                label: 'Tài liệu đo đạc',
                                labelPosition: 'left',
                                labelWidth: this.labelWidth,
                                align: 'left',
                                width: '100%'
                            },
                            {
                                columnWidth: '2%',
                                type: 'custom',
                                init: function (component) {
                                    var cpn = component.jqxButton({
                                        imgPosition: 'left',
                                        width: '',
                                        imgSrc: './src/images/icon-plus.png'
                                    }).parent().css('padding-left', '0px').css('padding-right', '0px');
                                    cpn.on({
                                        click: me.onShowPopUpDiaChi.bind(me)
                                    })
                                }
                            },
                            {
                                columnWidth: '50%',
                                type: 'text',
                                label: 'Vị trí',
                                labelPosition: 'left',
                                labelWidth: this.labelWidth,
                                width: '100%'
                            }]
                    },
                    {
                        columns: [
                            {
                                columnWidth: '48%',
                                type: 'text',
                                label: 'NG giao đất',
                                labelPosition: 'left',
                                labelWidth: this.labelWidth,
                                align: 'right',
                                width: '100%'
                            },
                            {
                                columnWidth: '2%',
                                type: 'custom',
                                init: function (component) {
                                    component.jqxButton({
                                        imgPosition: 'left',
                                        width: '',
                                        imgSrc: './src/images/icon-plus.png'
                                    }).parent().css('padding-left', '0px').css('padding-right', '0px');

                                }
                            },
                            {
                                columnWidth: '50%',
                                type: 'text',
                                label: 'NG khác',
                                labelPosition: 'left',
                                labelWidth: this.labelWidth,
                                width: '100%'
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                columnWidth: '47.9%',
                                type: 'text',
                                label: 'Thuộc dự án',
                                labelPosition: 'left',
                                labelWidth: this.labelWidth,
                                width: '100%'
                            },
                            {
                                columnWidth: '2%',
                                type: 'custom',
                                init: function (component) {
                                    component.jqxButton({
                                        imgPosition: 'left',
                                        width: '',
                                        imgSrc: './src/images/icon-plus.png'
                                    }).parent().css('padding-left', '0px').css('padding-right', '0px');
                                }
                            }
                        ]
                    },
                    {
                        columns: [{
                            type: 'text',
                            label: 'Địa chỉ',
                            labelPosition: 'left',
                            labelWidth: this.labelWidth,
                            width: '100%'
                        }, {
                            columnWidth: '2%',
                            type: 'custom',
                            init: function (component) {
                                component.jqxButton({
                                    imgPosition: 'left',
                                    width: '',
                                    imgSrc: './src/images/icon-plus.png'
                                }).parent().css('padding-left', '0px').css('padding-right', '0px');
                            }
                        }
                        ]
                    }
                ],
            showPopupDiaChi: false
        }
        this.onShowPopUpDiaChi = this.onShowPopUpDiaChi.bind(this);
    }
    componentDidMount() {
        this._isMounted = true;
        this.loadDMHuyen();
        setTimeout(() => {
            this.formTD.current!.refresh();
        }, 500);
    }
    loadDMHuyen() {
        let me = this;
        api.get("dvhc/ma_ct/01?lowercase=true").then(data => {
            if (this._isMounted) {
                // this.setState({ dmhuyen: data });
                let ddlHuyen = me.formTD.current.getComponentByName("huyen");
                ddlHuyen.jqxDropDownList({ source: data });
            }
        });
    }
    loadDMXa(mahuyen) {
        let me = this;
        api.get("dvhc/ma_ct/" + mahuyen + "?lowercase=true").then(data => {
            if (this._isMounted) {
                // this.setState({ dmxa: dmxa });
                let ddl = me.formTD.current!.getComponentByName("xa");
                ddl.jqxDropDownList({ source: data });
            }
        });
    }
    private onShowPopUpDiaChi(): void {
        this.myWindow.current.open();
    }
    private onClowPopUpDiaChi(): void {
        this.myWindow.current.open();
    }

    public render() {
        return (
            <div className='container-fluid'>
                <JqxNotification ref={this.myNotification}
                    autoOpen={true} width={200}>
                    Sample Notification
                </JqxNotification>
                <JqxTabs
                    width={'100%'}
                    position={"top"}
                    animationType={"none"}
                    selectionTracker={false}
                >
                    <ul>
                        <li style={{ marginLeft: 30 }}>Infomation</li>
                        <li>Property</li>
                        <li>Property</li>
                    </ul>
                    <div style={{ paddingTop: '10px' }} >
                        <ul className='container-fluid'>
                            <div className="jqx-menu-item-separator jqx-rc-all" >
                                <span style={{ position: 'relative', top: '-8px', left: '20px', transform: 'translateY(-50%)', paddingLeft: '10px', backgroundColor: '#fff' }}>Thông tin thửa đất</span>
                            </div>
                            <JqxForm ref={this.formTD} style={{ width: '100%', height: 'auto' }}
                                template={this.state.templateTD} backgroundColor={'white'} borderColor={'0px'}
                                value={this.state.formData} padding={{ left: 10, top: 10, right: 10, bottom: 10 }}
                            >
                            </JqxForm>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li style={{ listStyle: 'none', fontWeight: 'bold' }}>Property</li>
                            <li className="jqx-menu-item-separator jqx-rc-all"></li>
                        </ul>
                    </div>
                    <div>
                        <h3> Property</h3>
                    </div>
                </JqxTabs>
                <div style={{ width: '100%', height: 650, marginTop: 50 }}>
                    <JqxWindow ref={this.myWindow}
                        width={950} height={240}
                        autoOpen={false}
                    >
                        <div>
                            <span style={{ color: 'blue' }}> Địa chỉ </span>
                        </div>
                        <DiaChi2 />
                    </JqxWindow>
                </div>
            </div>
        );
    }
}
export default App;