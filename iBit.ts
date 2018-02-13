/**
  * Enumeration of Motor.
  */
enum motor {
    //% block="Forward \u21c8"
    Forward,
    //% block="Backward \u21ca"
    Backward
}

/**
  * Enumeration of TurnMotor.
  */
enum turn {
    //% block="Left \u27f5"
    Left,
    //% block="Right \u27f6"
    Right
}

/**
  * Enumeration of SpinMotor.
  */
enum spin {
    //% block="Left \u21f5"
    Left,
    //% block="Right \u21c5"
    Right
}
/**
  * Enumeration of ReadADC.
  */
enum readADC {
    //% block="ADC 0"
    ADC0 = 132,
    //% block="ADC 1"
    ADC1 = 196,
    //% block="ADC 2"
    ADC2 = 148,
    //% block="ADC 3"
    ADC3 = 212,
    //% block="ADC 4"
    ADC4 = 164,
    //% block="ADC 5"
    ADC5 = 228,
    //% block="ADC 6"
    ADC6 = 180,
    //% block="ADC 7"
    ADC7 = 224
}

/**
  * Enumeration of Servo.
  */
enum servo{
    //% block="1"
    SV1,
    //% Block="2"
    SV2
}


/**
 * Custom blocks
 */
//% weight=50 color=#54ceb8 icon="\uf197"
namespace IBIT {
      
    /**
      * Drive motor(s) Forward or Backward.
      *
      * @param Motor motor to drive.
      * @param speed speed of motor
      */
    //% blockId="ibit_Motor" block="Motor %motor|speed %speed"
    //% weight=100
    export function Motor(Motor: motor, speed: number): void {  
        let motorspeed = pins.map(speed,0,100,0,1023)     
        if (Motor == motor.Forward) {
           pins.digitalWritePin(DigitalPin.P13, 1)
           pins.analogWritePin(AnalogPin.P14, motorspeed)
           pins.digitalWritePin(DigitalPin.P15, 0)
           pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        if (Motor == motor.Backward) {
           pins.digitalWritePin(DigitalPin.P13, 0)
           pins.analogWritePin(AnalogPin.P14, motorspeed)
           pins.digitalWritePin(DigitalPin.P15, 1)
           pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
    }

     /**
      * Drive motor(s) TurnLeft or TurnRight .
      *
      * @param Turn motor to drive.
      * @param speed speed of Turn
      */
    //% blockId="ibit_Turn" block="Turn %motor|speed %speed"
    //% weight=99
    export function Turn(Turn: turn, speed: number): void {       
      let motorspeed = pins.map(speed,0,100,0,1023)      
        if (Turn == turn.Left) {           
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, 0)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        if (Turn == turn.Right) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, 0)
        }
    }

    /**
      * Drive motor(s) SpinLeft or SpinRight.
      *
      * @param Spin motor to drive.
      * @param speed speed of Spin
      */
    //% blockId="ibit_Spin" block="Spin %motor|speed %speed"
    //% weight=98
    export function Spin(Spin: spin, speed: number): void {   
        let motorspeed = pins.map(speed,0,100,0,1023)    
        if (Spin == spin.Left) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        if (Spin == spin.Right) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, motorspeed)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
    }
   /**
      * Block for stop all motor. 
      *
      * @param  MotorStop  motor all stop
      * 
      */
    //% blockId="ibit_MotorStop" block="Motor Stop"
    //% weight=97
    export function MotorStop():void{
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.analogWritePin(AnalogPin.P16, 0)
    }


/**
      * ReadADC analog channel 0-7   
      *    
      * @param ReadADC ReadADC Select Analog Channel 0-7 
      *
      */
    //% blockId="ibit_readADC" block="Read %readADC"
    //% weight=96
    export function ReadADC(ReadADC:readADC): number{ 
            let ADCValue:number;

            pins.i2cWriteNumber(
            72,
            ReadADC,
            NumberFormat.UInt8LE,
            false
            )
            return ReadADC = pins.i2cReadNumber(72, NumberFormat.UInt16BE, false)      
    }

    //% blockId="ibit_Servo" block="Servo %Servo Degree %Degree"
    //% weight=96
    export function Servo(Servo:servo, Degree:number): void{
        if(Servo == servo.SV1){
            pins.servoWritePin(AnalogPin.P8, 180)
        }
        else if(Servo == servo.SV2){
            pins.servoWritePin(AnalogPin.P12, 180)
        }

    }
}
