Procesador MIPS: Tneiendo su arquitectura hará lo que está dentro de sus posibilidades.

RAM: se almacenan las instrucciones que se harán. bits hexadecimal.

Se tiene un registro contador que suma 1 para recorrer la RAM secuencialmente. El sumador va contando.

![](C:\Users\lunaj\AppData\Roaming\marktext\images\2024-03-12-21-46-56-image.png)

CLK: pulso de relog. Su función es controlar el registro para actualizar la información de la RAM.

RESET: Resetea el contador. 

IR descompone lo que viene de la RAM (instrucción) en distintas partes que son: funct, shamt, Offset, rt, rs, jump, opcode. Hay distintos tipos de intrucciones que son: R (manejan los registros, cuando quieres sumar, restar... ), tipo I, tipo J.

TIPO I:

![](C:\Users\lunaj\AppData\Roaming\marktext\images\2024-03-12-22-00-54-image.png)

ADDI: si sumo lo que hay en rs con inmediate me da la posición donde está el dato. 

load instruction: de memoria a registro.

![](C:\Users\lunaj\AppData\Roaming\marktext\images\2024-03-12-22-03-38-image.png)

store: de registro a memoria.

![](C:\Users\lunaj\AppData\Roaming\marktext\images\2024-03-12-22-04-21-image.png)

Branch: 

if R1 beq R2 <-- Se manejan las condiciones.

Beq, benq: Salta a la dirección PC = PC + imm 

en la ram se slata a una posición especifica dependiendo del imm.

TIPO J: 

su función prinicipal es el manejo de saltos en le programa. 

![](C:\Users\lunaj\AppData\Roaming\marktext\images\2024-03-12-22-12-02-image.png)

Con esto se puede ver que tipo de instrucción estamos haciendo.

opcode: para saber la operación que queremos hacer con la instrucción. 

cuando la ins es tipo R el funct es necesario. El opcode no me da información necesaria para saber q hacer.

Unidad de Control UC: 

regdst: señal de 0 y 1 q me ayuda a decidir cual de las dos direcciones voy a dirigir el dato. Si es 0 rt. Si es 1 rd (tipo R). Tmabién me ayuda a saber cual es tipo R (1)  y tipo I (0).

regwrite activa donde quiero escribir en el registro correspondiente.

en donde voy a meter la información

![](C:\Users\lunaj\AppData\Roaming\marktext\images\2024-03-12-22-22-03-image.png)

ALUSRC: decide si para la ALU en la entrada B entra el offset por si es una instrucción tipo i.

![](C:\Users\User\AppData\Roaming\marktext\images\2024-03-15-11-11-51-image.png)

![](C:\Users\User\AppData\Roaming\marktext\images\2024-03-15-11-14-25-image.png)

rt es la dirección del registro de donde se saca el dato que se va a escribir en memoria.

Por eso la data sale del output B.

ADDI: es una instrucción tipo i pero escribe en un registro.

![](C:\Users\User\AppData\Roaming\marktext\images\2024-03-15-11-28-14-image.png)

Aqui se decide que tipo de operación hacer. Solo es necesario poner la entrada func por las instrucciones tipo R.

![](C:\Users\User\AppData\Roaming\marktext\images\2024-03-15-11-35-51-image.png)
