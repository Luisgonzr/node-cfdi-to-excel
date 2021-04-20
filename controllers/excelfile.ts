import { Request, Response } from "express"
import fs from 'fs';
import xml2js from 'xml2js';
import 'multer';
import { Cfdi } from "../models/cfdi";


const parser = new xml2js.Parser();


function errorDeleting(err: Error) {
    if (err) {
        console.log(err);
    } else {
        console.log('all files removed');
    }
};

function deleteFiles(files: Express.Multer.File[], callback: Function) {
    var i = files.length;
    files.forEach((file: any) => {
        fs.unlink(file.path, function (err) {
            i--;
            if (err) {
                callback(err);
                return;
            } else if (i <= 0) {
                callback(null);
            }
        });
    });
}

function isset(object: any) {
    if (typeof object !== 'undefined') {
        return true;
    } else {
        return false;
    }
}

function parseXmls(documentFiles: Express.Multer.File[], iterations: number){
    let resArray: any[] = [];
    for (let i = 0; i < iterations; i++) {
        let file = documentFiles[i];
        let data = fs.readFileSync(file.path);
        parser.parseString(data, (err: Error, result: any) => {
            console.log(Cfdi.getEmisor(result['cfdi:Comprobante']));
            console.log(Cfdi.getReceptor(result['cfdi:Comprobante']));
            console.log(Cfdi.getConceptos(result['cfdi:Comprobante']));
            resArray.push(result['cfdi:Comprobante']);
        });
    }
    return resArray;
}




export const postUser = async (req: Request, res: Response) => {

    const documentFiles = (req as any).files;
    let resArray: any[] = [];
    let files = documentFiles as any[];
    let iterator = files.length;
    resArray = parseXmls(files,iterator);
    let response = JSON.stringify(resArray)
    res.status(200).json(
        JSON.parse(response)
    );
    deleteFiles(documentFiles, errorDeleting);
}