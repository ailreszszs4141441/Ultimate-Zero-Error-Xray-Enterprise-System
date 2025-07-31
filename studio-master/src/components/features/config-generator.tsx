
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, QrCode, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useAppStore } from "@/lib/store";

export function ConfigGenerator() {
  const { toast } = useToast();
  const [showQr, setShowQr] = useState(false);
  const { finalConfig } = useAppStore();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Configuration is ready to be pasted.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(finalConfig, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "xray-config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
        title: "Download Complete",
        description: "Your Xray-core config has been downloaded.",
      });
  }
  
  const vlessLink = `vless://your-uuid-goes-here@server.quantum.proxy:443?encryption=none&flow=xtls-rprx-vision&security=reality&sni=www.google.com&fp=chrome&pbk=your-public-key&sid=your-short-id#QuantumProxy-AI-X`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline tracking-wider text-2xl">Your AI-Generated Config</CardTitle>
        <CardDescription>This configuration is a unique blend of all the features you've selected, optimized by AI for maximum performance and security.</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="mt-4 p-4 border rounded-md bg-black/20">
             <div className="max-h-96 overflow-auto rounded-md">
                <pre className="text-sm font-code text-accent">
                  <code>{JSON.stringify(finalConfig, null, 2)}</code>
                </pre>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button onClick={() => handleCopy(JSON.stringify(finalConfig, null, 2))}>
                  <Copy className="mr-2 h-4 w-4" /> Copy Config
                </Button>
                <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download JSON
                </Button>
                <Button variant="outline" onClick={() => setShowQr(!showQr)}>
                  <QrCode className="mr-2 h-4 w-4" /> {showQr ? 'Hide' : 'Show'} QR Code
                </Button>
            </div>
             {showQr && (
              <div className="mt-4 p-4 bg-white rounded-md inline-block">
                <Image 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(vlessLink)}`} 
                  alt="Configuration QR Code"
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>
      </CardContent>
    </Card>
  );
}
