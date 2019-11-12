import React from "react";
import api from '../../api';
import {Card, Form, FormLayout, Layout, Page, TextField,AppProvider, Button} from "@shopify/polaris";
import { backTheInstallPage } from "../../constants";
export default class pricingAndSupport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form : {
                subjectFieldValue: lang.your_subject,
                messageFieldValue: lang.your_message,
                emailFieldValue: '',
          }
        }
    }

    async componentWillMount(){
      const response = await api.getEmailShopOwner();
      const result = JSON.parse(response.text);
      if(result.data){
        this.setState({
            form: Object.assign({}, this.state.form, {
              emailFieldValue: result.data,
            }),
        })
      }
    }

    handleChangeValue (name, newValue) {
        this.setState({
            form: Object.assign({}, this.state.form, {
                [name]: newValue
            }),
        });
    };

    async onSubmit(){
       const { form } = this.state;
        try{
            const fetch = await api.sendSupportEmail(form);
            const result = JSON.parse(fetch.text);

        }catch(errors){
            alert(errors.message)
        }
    }
    
    render(){
        const {emailFieldValue, messageFieldValue, subjectFieldValue,} = this.state.form
        const supportAndPricingPage = (
        <Page title= {lang.boost_sales_notifications}>
            <Form onSubmit={this.onSubmit.bind(this)}>
                <Layout>
                    <Card sectioned>
                        <FormLayout>
                            <span>
                                {lang.we_are_always_willing_to_support_you_if_you_struggle_with_Boost_Sales_Notifications_Send_us_an_email_and_we_will_reply_within_48_hours}
                            </span>
                            <TextField
                                type="email"
                                label={lang.email}
                                value={emailFieldValue}
                                onChange={this.handleChangeValue.bind(this, 'emailFieldValue')}
                            />
                            <TextField
                                label={lang.subject}
                                value={subjectFieldValue}
                                onChange={this.handleChangeValue.bind(this,'subjectFieldValue')}
                            />
                            <TextField
                                label={lang.message}
                                value={messageFieldValue}
                                onChange={this.handleChangeValue.bind(this,'messageFieldValue')}
                                helpText={
                                    <span>
                                    {lang.thank_you_for_your_time_We_will_reply_to}
                                    {emailFieldValue}
                                    {lang.within_48_hours}
                                    </span>
                                }
                            />
                            <Button submit>{lang.save}</Button>
                        </FormLayout>
                    </Card>
                    <Layout.AnnotatedSection>
                        <p>
                            {lang.you_are_currently_on_our_free_plan}
                        </p>
                        <a href={backTheInstallPage} >
                            <Button onClick>{lang.buy_app_now}</Button>
                        </a>
                    </Layout.AnnotatedSection>
                </Layout>
            </Form>
        </Page>
    );
    return(
        <div style={{ height: '500px', weight: '1400px'}}>
            <AppProvider >
                {supportAndPricingPage}
            </AppProvider>
        </div>
    )
    }
} 