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
//httpMock.add('/api/tournament', __dirname + '/mocks/api_tournament.json');
//httpMock.add('Path',function(head,data){DO STUFF HERE AND RETURN});
//Abfrage durch localhost:3333/Path
httpMock.add('/api/V0.1',function(head,data)
{//Default response/fast request
		return GeneratePassword(12,"NoType");
});

httpMock.add('/api/V0.1/NonDefault',function(head,data)//Mit payload (heavy BETA) kann ignoriert werden
{
	try
	{
		return GeneratePassword(data.length,data.type);//Wenn JSON empfangen
	}
	catch
	{
		var obj_data = JSON.parse(data);//wenn JSON.stringify angwewendet wurde
		return GeneratePassword(obj_data.length,data.type);
	}
	final
	{
		return "Payload Format Error";		
	}
});


/*
httpMock.add('/api/V0.1',function(_,data){//Default response/fast request
	return GeneratePassword(12,"NoType");
});
//var data = [64,"HEXDEC"];
//console.log(GeneratePassword(data[0],data[1]));
*/