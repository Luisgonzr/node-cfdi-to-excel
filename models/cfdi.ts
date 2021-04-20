function isset(object: any) {
    if (typeof object !== 'undefined') {
        return true;
    } else {
        return false;
    }
}

export class Cfdi {

    private static getCleanNode(jsonXmlToBeCleaned: any, nodeName:String, pure:boolean = true){
        const nameCapitalized = nodeName.charAt(0).toUpperCase() + nodeName.slice(1)
        let name =  'cfdi:' + nameCapitalized;
        if(pure){
            if(isset(jsonXmlToBeCleaned[name][0]['$'])){
                return jsonXmlToBeCleaned[name][0]['$'];
            }else{
                return null;
            }
        }else{
            if(isset(jsonXmlToBeCleaned[name][0])){
                return jsonXmlToBeCleaned[name][0];
            }else{
                return null;
            }
        }
    }

    public static getEmisor(jsonXml:any){
        return this.getCleanNode(jsonXml,'emisor');
    }

    public static getReceptor(jsonXml:any){
        return this.getCleanNode(jsonXml,'receptor');
    }

    public static getConceptos(jsonXml:any){
        return this.getCleanNode(jsonXml,'conceptos',false);
    }
    

}