import React from 'react';
import '../../App.css';
import './Services.css';
import { Component } from "react"; 
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import  Axios from 'axios';
import {Link} from 'react-router-dom';

interface IProps { 
    isModifyMode: boolean; 
    boardId: number; 
    handleCancel: any;
 }

/** 
 * Write class 
 * @param {SS} e 
 */
class Write extends Component<IProps>{
   /**
     * @param {SS} props
     */
    constructor(props: any) { 
        super(props); 
        this.state = { 
            title: "",
            content: "", 
            isRendered: false, 
        }; 
    }

    state = {
        title: "", 
        content: "",
        memberName:"",
        randomPassword:"",
        isRendered:false,
    }; 

    write = () => { 
        Axios.post("http://localhost:8080/api/addAnyPost", { 
            title: this.state.title, 
            content: this.state.content,
            memberName:this.state.memberName,
            randomPassword:this.state.randomPassword,

        }) 
            .then((res) => { 
                this.setState({ 
                    title: "", 
                    content: "",
                    memberName:"",
                    randomPassword:"",
                }); 
                this.props.handleCancel();
            })
            .catch((e) => { 
                console.error(e); 
            });
    };

    update = () => { 
        Axios.post("http://localhost:8080/update", { 
            title: this.state.title, 
            content: this.state.content,
            memberName:this.state.memberName,
            randomPassword:this.state.randomPassword,
            id: this.props.boardId,
        }) 
        .then((res) => { 
            this.setState({
                title:"",
                content:"",
                memberName:"",
                randomPassword:"",
            });
            this.props.handleCancel();
        })
        .catch((e) => { 
            console.error(e); 
        }); 
    };

    detail = () => { 
        Axios.get(`http://localhost:8080/api/getAnyPost?id=${this.props.boardId}`) 
            .then((res) => { 
                if (res.data.length > 0) { 
                    this.setState({ 
                        title: res.data[0].title, 
                        content: res.data[0].content,
                        memberName:res.data[0].memberName,
                        randomPassword:res.data[0].randomPassword, 
                    }); 
                } 
            }) 
            .catch((e) => { 
                console.error(e); 
            }); 
        };
    
    handleChange = (e: any) => { 
        this.setState({ 
            [e.target.name] : e.target.value, 
        }); 
    };

    /** * * @param {any} prevProps */
    componentDidUpdate = (prevProps: any) => { 
        if (this.props.isModifyMode && this.props.boardId != prevProps.boardId) { 
            this.detail(); 
        } 
    };

    /** * @return {Component} Component */ 
    render() { 
        return ( 
        <div className="board_wrap">
            <div className="board_title">
                <strong>?????????</strong>
                <p>?????? ?????????: ?????? ????????? ???????????? ??????????????????. </p>
            </div>
            <div className='board_write'>
            <Form>
                <div className='title'>
                <Form.Group className='mb-3'> 
                    <Form.Label className='title2'>??????</Form.Label> 
                    <Form.Control className='title3' 
                    type="text" 
                    name="title" 
                    value={this.state.title}  
                    placeholder="????????? ???????????????"
                    onChange={this.handleChange} /> 
                </Form.Group>
                </div>
                <div className='info'>
                <Form.Group className='mb-3'> 
                    <Form.Label className='title2'>?????????</Form.Label> 
                    <Form.Control className='title3' 
                    type="text" 
                    name="memberName" 
                    value={this.state.memberName}  
                    placeholder="????????? ??????"
                    onChange={this.handleChange} /> 
                </Form.Group>
                <Form.Group className='mb-3'> 
                    <Form.Label className='title2'>????????????</Form.Label> 
                    <Form.Control className='title3' 
                    type="password" 
                    name="randomPassword" 
                    value={this.state.randomPassword}  
                    placeholder="????????????"
                    onChange={this.handleChange} /> 
                </Form.Group>
                </div>
                <div className='cont'>
                <Form.Group className='mb-3'> 
                    <Form.Label className='title2'></Form.Label> 
                    <Form.Control className='title3' 
                    as="textarea" 
                    name="content"
                    value={this.state.content}
                    placeholder="????????? ???????????????"
                    onChange={this.handleChange} />  
                </Form.Group>
                </div>
            </Form>
            </div>
            <div className="bt_wrap">
                <Link to='/services'><Button variant="info" className='on' onClick={this.write}>????????????</Button></Link>
                <Link to='/services'><Button variant="secondary" onClick={this.props.handleCancel}>??????</Button></Link>
            </div>       
        </div> 
            ); 
        } 
    } 
export default Write;