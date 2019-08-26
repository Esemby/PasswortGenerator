//const
const httpMock = require('@Zemke/http-mock')(3333);//Florians Mock HTTP
const characterGeneralBlacklist = [34,39,44,47,58,59,64,92,94,96,123,124,125,127];
const characterHEXDECWhitelist = [48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70];
//functions
function GeneratePassword(pw_lenght,type)
{
	var result = "";
	for(var x = 0; x < pw_lenght;x++)
	{
		var RNG = Math.random()* (127-33)+33;//all characters till 32 (Space) are operators and must be ignored;
		RNG = Math.floor(RNG);
		
		if(type == "NoType")//No Type
		{
			while(characterGeneralBlacklist.includes(RNG))//Genarl unaccaptable ASCII in PW
			{
				RNG = Math.random()* (126-33)+33;//Rinse and repeate
				RNG = Math.floor(RNG);
			}		
		
		}
		if(type == "HEXDEC")//Hexadecimal
		{
			while(!characterHEXDECWhitelist.includes(RNG))
			{
				RNG = Math.random()* (126-33)+33;//Rinse and repeate
				RNG = Math.floor(RNG);				
			}
		}
		
		result += String.fromCharCode(RNG);//Convert Int to ASCII
	}
	return result;
}

//main
//httpMock.add('Path',function(head,data){DO STUFF HERE AND RETURN});
httpMock.add('/api/V1.0',function(_,data){
	return data;
});
//var data = [64,"HEXDEC"];
//console.log(GeneratePassword(data[0],data[1]));

