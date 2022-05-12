import random
from azure.iot.device import IoTHubDeviceClient, Message
from datetime import datetime

# Primary Connection String
CONN_STR = "HostName=simulateAppIotHub.azure-devices.net;DeviceId=deviceSimulator;SharedAccessKey=HSxgr2IqIloYURYLzbLQt45R0gYqKIJo4Ad36kZR6Zw="

# Converts Sensor Data to JSON form
def createMessage(**kwargs):
    msg = '{'
    for k,v in kwargs.items():
        msg += f'"{k}":"{v}",'
    msg = msg[0:-1]
    msg += "}"
    print(msg)
    message = Message(msg)
    return message
    
def client_hub_init():
    client = IoTHubDeviceClient.create_from_connection_string(CONN_STR)
    return client

      
if __name__ == '__main__':
    try:
        client = client_hub_init()
        while True:
            print("="*50)
            print("Press 1 to send Random Data.")
            print("Press 2 to send Custom Data.")
            print("Press 3 to Exit.")
            
            inp = input('Enter (1/2/3):')
            time = datetime.now()
            time = time.strftime('%d-%m-%Y %H:%M:%S.%f')
            if inp == '1':
                msg = createMessage(temperature=round(random.uniform(-10,60),2),humidity=round(random.uniform(0,100),2),pressure=round(random.uniform(29,31),2),time=time)
            elif inp == '2':
                temperature = float(input('Enter Temperature (°C): '))
                humidity = float(input('Enter Humidity (%): '))
                pressure = float(input('Enter Pressure (Hg): '))
                msg = createMessage(temperature=temperature,humidity=humidity,pressure=pressure,time=time)
            elif inp == '3':
                break
            else:
                continue
            client.send_message(msg)
            print('Message Sent Successfully!')
            
            print("*"*50)
            print("\n"*3)
        
    except Exception as e:
        print('There is some error.',e)
    
    print("\n"*5)
    print('Exiting gracefully...')