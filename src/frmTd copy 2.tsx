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
import { ApiClient } from "./api.js";
import JqxNotification, { INotificationProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification';
import JqxWindow from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxwindow';

let api = new ApiClient();
interface MyComponentProps { /* declare your component's props here */ }
interface MyComponentState {
    templateDiachi: Array<object>,
    formDataDiachi: Object,
    dmTinh: Array<object>
    // loading: boolean
}

class DiaChi2 extends React.Component<MyComponentProps, MyComponentState> {
    private formDiaChiTest = React.createRef<JqxForm>();
    private labelWidth = '110px';
    _isMounted = false;
    private dmTinh1 = []

    private myWindow = React.createRef<JqxWindow>();
    private jqxWidget = React.createRef<HTMLDivElement>();

    constructor(props) {
        super(props);
        let me = this;
        this.state = {
            templateDiachi: [
                {
                    columns: [
                        {
                            columnWidth: '33%',
                            label: 'Province',
                            type: 'custom',
                            bind: 'tinh',
                            name: 'tinh',
                            required: true,
                            labelWidth: this.labelWidth,
                            width: '100%',
                            init: function (component) {
                                component.jqxDropDownList({
                                    // source: me.state.dmTinh,
                                    displayMember: 'ten',
                                    filterPlaceHolder: 'Type for searching',
                                    valueMember: 'ma',
                                    width: '100%',
                                    searchMode: 'containsignorecase',
                                    enableBrowserBoundsDetection: true,
                                    filterable: true
                                }).on({
                                    change: me.thanhTinhOnChange
                                })
                            }
                        },
                        {
                            columnWidth: '33%',
                            label: 'District',
                            type: 'custom',
                            bind: 'huyen',
                            name: 'huyen',
                            required: true,
                            labelWidth: this.labelWidth,
                            width: '100%',
                            init: function (component) {
                                component.jqxDropDownList({
                                    displayMember: 'ten',
                                    filterPlaceHolder: 'Type for searching',
                                    valueMember: 'ma',
                                    width: '100%',
                                    searchMode: 'containsignorecase',
                                    enableBrowserBoundsDetection: true,
                                    filterable: true
                                }).on({
                                    change: me.quanHuyenOnChange
                                })
                            }
                        },
                        {
                            columnWidth: '33%',
                            label: 'Commune',
                            type: 'custom',
                            bind: 'xa',
                            name: 'xa',
                            required: true,
                            labelWidth: this.labelWidth,
                            width: '100%',
                            init: function (component) {
                                component.jqxDropDownList({
                                    displayMember: 'ten',
                                    filterPlaceHolder: 'Type for searching',
                                    valueMember: 'ma',
                                    width: '100%',
                                    searchMode: 'containsignorecase',
                                    enableBrowserBoundsDetection: true,
                                    filterable: true
                                }).on({
                                    change: me.phuongXaOnChange
                                })
                            }
                        }
                    ]
                }
            ],
            formDataDiachi: {},
            dmTinh: []
        }
        this.loadDMTinh = this.loadDMTinh.bind(this);
        this.loadDMHuyen =  this.loadDMHuyen.bind(this);
        this.loadDMXa = this.loadDMXa.bind(this);
        this.thanhTinhOnChange = this.thanhTinhOnChange.bind(this);
        this.quanHuyenOnChange = this.quanHuyenOnChange.bind(this);
        this.phuongXaOnChange = this.phuongXaOnChange.bind(this);
    }
    componentDidMount() {
        this._isMounted = true;
        this.loadDMTinh();
        // this.loadDMHuyen();
        // this.thuadat_ct();
        // this.getDmMdsdThuaDat();
        // this.myWindow.current.close();
        // setTimeout(() => {
        //     this.formTD.current!.refresh();
        //     this.formMDSD.current!.refresh();
        // }, 500);
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    private onFormDataChange(e: Event): void {
        console.log(e);
    }
    loadDMTinh() {
        let me = this;
        api.get("dvhc/ma_ct/VN?lowercase=true").then(data => {
            if (this._isMounted) {
                let ddlTinh = me.formDiaChiTest.current.getComponentByName("tinh");
                ddlTinh.jqxDropDownList({ source: data});
            }
        });
    }
    loadDMHuyen(maTinh) {
        let me = this;
        api.get("dvhc/ma_ct/"+ maTinh +"?lowercase=true").then(data => {
            if (this._isMounted) {
                let ddlHuyen = me.formDiaChiTest.current!.getComponentByName("huyen");
                ddlHuyen.jqxDropDownList({ source: data });
            }
        });
    }
    loadDMXa(mahuyen) {
        let me = this;
        api.get("dvhc/ma_ct/" + mahuyen + "?lowercase=true").then(data => {
            if (this._isMounted) {
                // this.setState({ dmxa: dmxa });
                let ddlXa = me.formDiaChiTest.current!.getComponentByName("xa");
                ddlXa.jqxDropDownList({ source: data });
            }
        });
    }
    thanhTinhOnChange(e: Event): void {
        let maTinh = e['args'].item.value;
        e.preventDefault();
        this.loadDMHuyen(maTinh);
        // e.preventDefault();
    }
    quanHuyenOnChange(e: Event): void {
        let mahuyen = e['args'].item.value;
        this.loadDMXa(mahuyen);
    }
    phuongXaOnChange(e: Event): void {
        let mahuyen = e['args'].item.value;
    }
    public render() {
        return (
            <div>
                <JqxForm ref={this.formDiaChiTest} style={{ width: '100%', height: '100%' }}
                    template={this.state.templateDiachi} backgroundColor={'white'} borderColor={'0px'}
                    value={this.state.formDataDiachi} padding={{ left: 10, top: 10, right: 10, bottom: 10 }}
                >
                </JqxForm>
            </div>
        );
    }
}
export default DiaChi2;