"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, QrCode, Smartphone, Laptop, Apple, Server } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const mockConfig = {
  "log": {
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "port": 1080,
      "protocol": "socks",
      "settings": {
        "auth": "noauth"
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "vless",
      "settings": {
        "vnext": [
          {
            "address": "server.quantum.proxy",
            "port": 443,
            "users": [
              {
                "id": "your-uuid-goes-here",
                "encryption": "none",
                "flow": "xtls-rprx-vision"
              }
            ]
          }
        ]
      },
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {
          "show": false,
          "dest": "www.google.com:443",
          "xver": 0,
          "serverNames": ["www.google.com"],
          "privateKey": "your-private-key",
          "shortId": "your-short-id"
        }
      }
    }
  ]
};

export function ConfigGenerator() {
  const { toast } = useToast();
  const [showQr, setShowQr] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Configuration link is ready to be pasted.",
    });
  };
  
  const vlessLink = "vless://your-uuid-goes-here@server.quantum.proxy:443?encryption=none&flow=xtls-rprx-vision&security=reality&sni=www.google.com&fp=chrome&pbk=your-public-key&sid=your-short-id#QuantumProxy";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline tracking-wider text-2xl">Configuration Generator</CardTitle>
        <CardDescription>Generate ready-to-use configs for all your devices.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Protocol</label>
            <Select defaultValue="vless-reality">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="vless-reality">VLESS + Reality</SelectItem>
                <SelectItem value="vmess">VMess</SelectItem>
                <SelectItem value="trojan">Trojan</SelectItem>
                <SelectItem value="shadowsocks">Shadowsocks</SelectItem>
                <SelectItem value="wireguard">WireGuard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Encryption</label>
            <Select defaultValue="falcon">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="falcon">Falcon (Quantum-Safe)</SelectItem>
                <SelectItem value="kyber">Kyber (Quantum-Safe)</SelectItem>
                <SelectItem value="ntru">NTRUEncrypt (Quantum-Safe)</SelectItem>
                <SelectItem value="aes-256-gcm">AES-256-GCM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="android" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="android"><Smartphone className="mr-2 h-4 w-4"/>Android</TabsTrigger>
            <TabsTrigger value="ios"><Apple className="mr-2 h-4 w-4"/>iOS</TabsTrigger>
            <TabsTrigger value="desktop"><Laptop className="mr-2 h-4 w-4"/>Desktop</TabsTrigger>
            <TabsTrigger value="linux"><Server className="mr-2 h-4 w-4"/>Linux</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 p-4 border rounded-md bg-black/20">
             <div className="max-h-60 overflow-auto rounded-md">
                <pre className="text-sm font-code text-accent">
                  <code>{JSON.stringify(mockConfig, null, 2)}</code>
                </pre>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button onClick={() => handleCopy(vlessLink)}>
                  <Copy className="mr-2 h-4 w-4" /> Copy Link
                </Button>
                <Button variant="outline" onClick={() => setShowQr(!showQr)}>
                  <QrCode className="mr-2 h-4 w-4" /> {showQr ? 'Hide' : 'Show'} QR Code
                </Button>
            </div>
             {showQr && (
              <div className="mt-4 p-4 bg-white rounded-md inline-block">
                <Image 
                  src="https://placehold.co/200x200.png" 
                  alt="Configuration QR Code"
                  data-ai-hint="qr code"
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
