import React from 'react'
import styles from './css/Definition.module.css';
import Container from './Container';

export interface DefinitionModel {
    title: string,
    titleHyperlink?: string,
    body?: any
}

const Definition = (props: DefinitionModel) => { 
    return (
        <Container>
            <h2 className={styles.definitionTitle}><a href={props.titleHyperlink}>{props.title}</a></h2>
            <div className={styles.definitionBody}>{props.body}</div>
        </Container>
    )
} 

export default Definition;